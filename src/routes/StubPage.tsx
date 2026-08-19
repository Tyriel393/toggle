import { Link } from 'react-router-dom'
import { PageContainer, TopBar } from '@/components/toggl/Shell'
import { Button } from '@/components/toggl/Button'
import { EmptyStateView } from '@/components/toggl/EmptyState'

/*
 * Placeholder for the rest of the app. Dead links to other sections are
 * explicitly fine per the assignment guidance — the feature itself must work.
 */
export function StubPage({ title }: { title: string }) {
  return (
    <>
      <TopBar title={title} />
      <PageContainer>
        <div className="rounded-lg border border-line bg-bg">
          <EmptyStateView
            title="Not part of this prototype"
            body="This section stands in for the rest of Toggl 2.0. The component kit shows what has been built."
            action={
              <Link to="/kit">
                <Button variant="primary" size="lg">Open the kit</Button>
              </Link>
            }
          />
        </div>
      </PageContainer>
    </>
  )
}
