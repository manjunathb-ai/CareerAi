-- Create a new storage bucket for resumes
insert into storage.buckets (id, name, public)
values ('resumes', 'resumes', false);

-- Set up RLS for the resumes bucket
-- Allow users to upload their own resumes
create policy "Users can upload their own resumes."
on storage.objects for insert
with check (
  bucket_id = 'resumes' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow users to view their own resumes
create policy "Users can view their own resumes."
on storage.objects for select
using (
  bucket_id = 'resumes' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow users to delete their own resumes
create policy "Users can delete their own resumes."
on storage.objects for delete
using (
  bucket_id = 'resumes' AND
  (storage.foldername(name))[1] = auth.uid()::text
);
