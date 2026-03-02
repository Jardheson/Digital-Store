import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ugxdvjhibgwhrevbitvu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVneGR2amhpYmd3aHJldmJpdHZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0NzQ5MjcsImV4cCI6MjA4ODA1MDkyN30.YxrC9URHyst1jzHo3RELSO6AenygBgMFR_GC_2wZcrs';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
