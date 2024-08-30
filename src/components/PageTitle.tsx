import Package from '../../package.json'

interface PageTitleProps {
  pageName?: string
}

export const PageTitle: React.FC<PageTitleProps> = ({ pageName }) => {
  return (
    <h3>
      {Package.displayName}
      {pageName ? ` - ${pageName}` : ''}
    </h3>
  )
}
