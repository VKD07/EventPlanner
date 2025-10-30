import { createClient} from '@supabase/supabase-js';

export const supabase = createClient(
    'https://rofszjtkgvhqioscwrmy.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJvZnN6anRrZ3ZocWlvc2N3cm15Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2NjQ3MDEsImV4cCI6MjA3NzI0MDcwMX0.hW5ZkeD-DQeF-I506pKWrlNoqSEJrVI90aiheq5gu70'
);