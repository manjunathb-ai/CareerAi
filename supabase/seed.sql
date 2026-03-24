-- Seed file for initial development data

-- Note: In a real Supabase environment, IDs would need to match auth users.
-- These are placeholder inserts for schema verification.

-- Seed profiles (Note: normally handled by triggers on auth.user creation)
-- INSERT INTO profiles (id, full_name, username, preferred_job_title)
-- VALUES ('00000000-0000-0000-0000-000000000000', 'CareerAI Admin', 'admin', 'Lead AI Engineer');

-- Sample Resume Data
-- INSERT INTO resumes (user_id, title, content, ats_score)
-- VALUES 
-- ('00000000-0000-0000-0000-000000000000', 'Senior Full Stack Resume', '{"work_experience": [...]}', 98),
-- ('00000000-0000-0000-0000-000000000000', 'Technical Product Manager', '{"work_experience": [...]}', 85);

-- Sample Portfolio Settings
-- INSERT INTO portfolios (user_id, slug, content, is_published)
-- VALUES 
-- ('00000000-0000-0000-0000-000000000000', 'johndoe-portfolio', '{"projects": [...]}', true);

-- Sample Interview Session
-- INSERT INTO interviews (user_id, job_title, transcript, overall_score)
-- VALUES
-- ('00000000-0000-0000-0000-000000000000', 'Senior React Developer', '[{"role": "assistant", "content": "Tell me about your experience with Framer Motion."}]', 92);
