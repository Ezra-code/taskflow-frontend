import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/proile')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/proile"!</div>
}
