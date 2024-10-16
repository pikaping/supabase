import { useState, PropsWithChildren } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, List } from 'lucide-react'
import {
  cn,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'ui'

import { type FeatureType, features } from '~/data/features'

interface Props {
  className?: string
  wrapperClassName?: string
  currentFeature: FeatureType
  prevLink: string
  nextLink: string
}

Array.prototype.sortBy = function (property) {
  return this.sort((a, b) => {
    if (a[property] < b[property]) return -1
    if (a[property] > b[property]) return 1
    return 0
  })
}

const buttonClassName =
  'relative z-10 flex items-center gap-1 px-2 pointer-events-auto overflow-hidden !h-[30px] !min-w-[30px] !max-w-[30px] py-1 justify-center rounded-full border bg-default hover:bg-surface-100 hover:text-foreground hover:border-foreground-lighter transition-all'
const iconClassName = 'className="w-4 h-4 flex-shrink-0'

const PrevNextFeatureNav: React.FC<Props> = ({
  className,
  wrapperClassName,
  currentFeature,
  prevLink,
  nextLink,
  ...props
}) => (
  <div
    className={cn(
      'h-full w-full max-w-2xl absolute mx-auto inset-0 pointer-events-none',
      wrapperClassName
    )}
    {...props}
  >
    <div
      className={cn(
        'absolute top-10 w-fit pointer-events-auto flex items-center text-sm gap-1 text-foreground-light right-8 md:right-0',
        className
      )}
    >
      <ButtonLink href={prevLink} className="text-right pl-2">
        <ArrowLeft className={iconClassName} />
        <span className="sr-only">Previous feature</span>
      </ButtonLink>
      <DropdownMenu>
        <DropdownMenuTrigger className={cn(buttonClassName, 'p-0')}>
          <List className={iconClassName} />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" alignOffset={-38} className="pb-0">
          <DropdownMenuLabel className="text-foreground-lighter p-0">
            <Link
              href="/features"
              className="group/link flex items-center gap-2 px-2 py-1.5 w-full hover:text-foreground"
            >
              <span className="line-clamp-1 flex-grow">All Features</span>
              <ChevronRight className="w-3 h-3 text-foreground-lighter group-hover/link:text-foreground transition-colors" />
            </Link>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="mb-0" />
          <DropdownMenuGroup className="max-h-[400px] overflow-y-scroll py-1">
            {features.sortBy('title').map((feature) => (
              <DropdownMenuItem key={feature.slug} className="p-0">
                <Link
                  href={`/features/${feature.slug}`}
                  className="group/link flex items-center gap-2 px-2 py-1.5 w-full hover:text-foreground"
                >
                  <feature.icon className="w-3 h-3 text-foreground-lighter group-hover:text-foreground transition-colors" />
                  <span className="line-clamp-1 flex-grow">{feature.title}</span>
                  <ChevronRight className="w-3 h-3 transition-opacity opacity-0 group-hover/link:opacity-100" />
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <ButtonLink href={nextLink}>
        <span className="sr-only">Next feature</span>
        <ArrowRight className={iconClassName} />
      </ButtonLink>
    </div>
  </div>
)

interface ButtonLinkProps {
  href: string
  className?: string
}

const ButtonLink: React.FC<PropsWithChildren<ButtonLinkProps>> = ({
  href,
  className,
  children,
}) => {
  return (
    <Link href={href} className={cn(buttonClassName, className)}>
      {children}
    </Link>
  )
}

export default PrevNextFeatureNav
