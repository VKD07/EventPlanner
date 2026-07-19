import { createClient} from '@supabase/supabase-js';

export const supabase = createClient(
    'https://vxlszdludtnqqiomesvl.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ4bHN6ZGx1ZHRucXFpb21lc3ZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQzOTc2MzksImV4cCI6MjA5OTk3MzYzOX0.VfGq0rhYZALBO-kpfA8OKUN_6AQEHDn-gcnxp4-GCek'
);