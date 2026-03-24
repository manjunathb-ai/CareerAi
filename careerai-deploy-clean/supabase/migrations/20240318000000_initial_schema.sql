-- Create a function to handle new user registration
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Create a table for public profiles
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone,
  username text unique,
  full_name text,
  avatar_url text,
  website text,
  preferred_job_title text,
  experience_level text,
  bio text,

  constraint username_length check (char_length(username) >= 3)
);

-- Set up Row Level Security for profiles
alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

-- Create a table for Resumes
create table resumes (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  created_at timestamp with time zone default now(),
  title text not null,
  content jsonb not null, -- Stores the generated JSON structure
  ats_score int,
  file_url text
);

alter table resumes enable row level security;

create policy "Users can view own resumes." on resumes
  for select using (auth.uid() = user_id);

create policy "Users can insert own resumes." on resumes
  for insert with check (auth.uid() = user_id);

create policy "Users can update own resumes." on resumes
  for update using (auth.uid() = user_id);

create policy "Users can delete own resumes." on resumes
  for delete using (auth.uid() = user_id);

-- Create a table for Portfolios
create table portfolios (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  created_at timestamp with time zone default now(),
  slug text unique not null,
  theme_config jsonb,
  content jsonb not null,
  is_published boolean default false
);

alter table portfolios enable row level security;

create policy "Portfolios are public once published." on portfolios
  for select using (is_published = true or auth.uid() = user_id);

create policy "Users can manage own portfolios." on portfolios
  for all using (auth.uid() = user_id);

-- Create a table for Interviews
create table interviews (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  created_at timestamp with time zone default now(),
  job_title text not null,
  transcript jsonb not null, -- Array of messages
  feedback text,
  overall_score int
);

alter table interviews enable row level security;

create policy "Users can manage own interviews." on interviews
  for all using (auth.uid() = user_id);

-- Create a table for Subscriptions
create table subscriptions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null unique,
  stripe_customer_id text unique,
  stripe_subscription_id text unique,
  status text,
  price_id text,
  current_period_end timestamp with time zone
);

alter table subscriptions enable row level security;

create policy "Users can view own subscription." on subscriptions
  for select using (auth.uid() = user_id);
