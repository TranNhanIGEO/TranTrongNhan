import { FC } from 'react'
import { Breadcrumb } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AppBreadcrumbItemProps, AppBreadcrumbProps } from './types/breadcrumbTypes'
import StringHelper from 'helpers/stringHelper'

const AppBreadcrumb: FC<AppBreadcrumbProps> = ({ pathname }) => {
  const directions: AppBreadcrumbItemProps[] = StringHelper.toDirectionArray(pathname);

  return (
    <Breadcrumb>
      {directions?.map(dir => (
        <Breadcrumb.Item 
          key={dir.value} 
          linkAs={Link} 
          linkProps={{ to: dir.value }}
          active={dir.value === pathname}
        >
          {dir.name}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  )
}

export default AppBreadcrumb