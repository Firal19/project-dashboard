"use client"

import { useEffect, useState, useRef } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { ProjectHeader } from "@/components/project-header"
import { ProjectTimeline } from "@/components/project-timeline"
import { computeFilterCounts, projects } from "@/lib/data/projects"
import { DEFAULT_VIEW_OPTIONS, type FilterChip, type ViewOptions } from "@/lib/view-options"
import { chipsToParams, paramsToChips } from "@/lib/url/filters"

export function ProjectsContent() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [viewOptions, setViewOptions] = useState<ViewOptions>(DEFAULT_VIEW_OPTIONS)

  const [filters, setFilters] = useState<FilterChip[]>([])

  const isSyncingRef = useRef(false)
  const prevParamsRef = useRef<string>("")

  const removeFilter = (key: string, value: string) => {
    const next = filters.filter((f) => !(f.key === key && f.value === value))
    setFilters(next)
    replaceUrlFromChips(next)
  }

  const applyFilters = (chips: FilterChip[]) => {
    setFilters(chips)
    replaceUrlFromChips(chips)
  }

  useEffect(() => {
    const currentParams = searchParams.toString()

    // Only sync if this is the first load or if params actually changed (not from our own update)
    if (prevParamsRef.current === currentParams) return

    // If we just made an update, skip this sync to avoid feedback loop
    if (isSyncingRef.current) {
      isSyncingRef.current = false
      return
    }

    prevParamsRef.current = currentParams
    const params = new URLSearchParams(searchParams.toString())
    const chips = paramsToChips(params)
    setFilters(chips)
  }, [searchParams])

  const replaceUrlFromChips = (chips: FilterChip[]) => {
    const params = chipsToParams(chips)
    const qs = params.toString()
    const url = qs ? `${pathname}?${qs}` : pathname

    isSyncingRef.current = true
    prevParamsRef.current = qs
    router.replace(url, { scroll: false })
  }

  return (
    <div className="flex flex-1 flex-col bg-background mx-2 my-2 border border-border rounded-lg min-w-0">
      <ProjectHeader
        filters={filters}
        onRemoveFilter={removeFilter}
        onFiltersChange={applyFilters}
        counts={computeFilterCounts(projects)}
        viewOptions={viewOptions}
        onViewOptionsChange={setViewOptions}
      />
      <ProjectTimeline />
    </div>
  )
}
