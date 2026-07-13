import { AppHeader } from '@/components/ui/AppHeader'
import { createServerClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  return (
    <div className="min-h-screen bg-ec-off-white">
      <AppHeader />
      <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
    </div>
  )
}
