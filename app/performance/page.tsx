"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { MagnifyingGlass, TrendUp, TrendDown } from "@phosphor-icons/react/dist/ssr"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { BRANDS, BRAND_MAP, type BrandId } from "@/lib/data/brands"

type BrandPerf = {
    brand: BrandId
    revenue: number
    revGrowth: number
    activeProjects: number
    closedDeals: number
    contentPosts: number
    engagement: number
    avgProjectValue: number
    topClient: string
}

const brandPerformance: BrandPerf[] = [
    { brand: "berhan", revenue: 190000, revGrowth: 18, activeProjects: 4, closedDeals: 8, contentPosts: 32, engagement: 3.8, avgProjectValue: 30000, topClient: "Ethio Telecom" },
    { brand: "tirat", revenue: 110000, revGrowth: 12, activeProjects: 3, closedDeals: 5, contentPosts: 14, engagement: 4.1, avgProjectValue: 27000, topClient: "BlueMoon Hotel" },
    { brand: "debo", revenue: 285000, revGrowth: 25, activeProjects: 3, closedDeals: 3, contentPosts: 8, engagement: 0, avgProjectValue: 85000, topClient: "Ride Ethiopia" },
    { brand: "ethio-influencers", revenue: 155000, revGrowth: 8, activeProjects: 2, closedDeals: 6, contentPosts: 45, engagement: 5.1, avgProjectValue: 28000, topClient: "Habesha Breweries" },
    { brand: "ethiobot", revenue: 50000, revGrowth: 40, activeProjects: 1, closedDeals: 2, contentPosts: 10, engagement: 0, avgProjectValue: 25000, topClient: "Dashen Bank" },
]

type FreelancerPerf = {
    name: string
    role: string
    projects: number
    rating: number
    onTime: number
    earned: number
    brands: BrandId[]
}

const freelancerPerformance: FreelancerPerf[] = [
    { name: "Liya Bekele", role: "Graphic Designer", projects: 22, rating: 4.9, onTime: 95, earned: 55000, brands: ["tirat"] },
    { name: "Dawit Solomon", role: "Full-Stack Developer", projects: 15, rating: 4.9, onTime: 93, earned: 84000, brands: ["debo", "ethiobot"] },
    { name: "Hanna Fikru", role: "Video Editor", projects: 18, rating: 4.7, onTime: 88, earned: 36000, brands: ["ethio-influencers", "tirat"] },
    { name: "Sara Tesfaye", role: "Social Media Manager", projects: 12, rating: 4.8, onTime: 100, earned: 43200, brands: ["berhan"] },
    { name: "Abebe Mulugeta", role: "Content Creator", projects: 8, rating: 4.5, onTime: 90, earned: 22400, brands: ["berhan", "ethio-influencers"] },
    { name: "Kidist Yohannes", role: "Content Creator", projects: 10, rating: 4.6, onTime: 85, earned: 34000, brands: ["ethio-influencers"] },
    { name: "Meron Assefa", role: "Influencer Manager", projects: 6, rating: 4.4, onTime: 82, earned: 18000, brands: ["ethio-influencers"] },
    { name: "Abel Kebede", role: "Frontend Developer", projects: 5, rating: 4.3, onTime: 78, earned: 16000, brands: ["debo"] },
]

function formatETB(v: number) { return v.toLocaleString("en-US") }

export default function PerformancePage() {
    const [tab, setTab] = useState<"brands" | "freelancers">("brands")
    const [search, setSearch] = useState("")
    const [selectedBrand, setSelectedBrand] = useState<BrandPerf | null>(null)

    const totalRevenue = brandPerformance.reduce((s, b) => s + b.revenue, 0)
    const avgGrowth = Math.round(brandPerformance.reduce((s, b) => s + b.revGrowth, 0) / brandPerformance.length)

    const filteredFreelancers = freelancerPerformance.filter(f => search === "" || f.name.toLowerCase().includes(search.toLowerCase()))

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <div className="flex flex-col h-full">
                    <header className="flex items-center justify-between border-b border-border/40 px-8 py-5">
                        <div>
                            <h1 className="text-xl font-semibold tracking-tight">Performance</h1>
                            <p className="text-sm text-muted-foreground mt-0.5">Brand & freelancer performance metrics.</p>
                        </div>
                    </header>

                    <div className="px-8 py-5 border-b border-border/40">
                        <div className="grid grid-cols-3 gap-4">
                            <div className="rounded-xl border border-border/60 bg-card p-4">
                                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Total Revenue</span>
                                <p className="text-2xl font-bold mt-1">{formatETB(totalRevenue)} <span className="text-sm font-normal text-muted-foreground">ETB</span></p>
                            </div>
                            <div className="rounded-xl border border-border/60 bg-card p-4">
                                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Avg Growth</span>
                                <p className="text-2xl font-bold mt-1 flex items-center gap-1">{avgGrowth}% <TrendUp className="h-4 w-4 text-emerald-500" /></p>
                            </div>
                            <div className="rounded-xl border border-border/60 bg-card p-4">
                                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Active Brands</span>
                                <p className="text-2xl font-bold mt-1">{brandPerformance.length}</p>
                            </div>
                        </div>
                    </div>

                    <div className="px-8 py-4 border-b border-border/40 flex items-center gap-4">
                        <div className="flex bg-muted/50 rounded-lg p-0.5">
                            <button onClick={() => setTab("brands")} className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${tab === "brands" ? "bg-background shadow-sm" : "text-muted-foreground"}`}>By Brand</button>
                            <button onClick={() => setTab("freelancers")} className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${tab === "freelancers" ? "bg-background shadow-sm" : "text-muted-foreground"}`}>By Freelancer</button>
                        </div>
                        {tab === "freelancers" && (
                            <div className="relative max-w-sm flex-1">
                                <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Search talent..." className="pl-9 h-9" value={search} onChange={(e) => setSearch(e.target.value)} />
                            </div>
                        )}
                    </div>

                    <div className="flex-1 overflow-auto p-8">
                        {tab === "brands" ? (
                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                                {brandPerformance.map((bp) => {
                                    const brand = BRAND_MAP[bp.brand]
                                    return (
                                        <div key={bp.brand} onClick={() => setSelectedBrand(bp)} className="rounded-xl border border-border/60 bg-card p-5 hover:shadow-md transition-all cursor-pointer">
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center gap-2.5">
                                                    <span className={`h-3 w-3 rounded-full ${brand.dotColor}`} />
                                                    <h3 className="font-semibold">{brand.name}</h3>
                                                </div>
                                                <span className={`inline-flex items-center gap-0.5 text-xs font-bold ${bp.revGrowth >= 0 ? "text-emerald-500" : "text-red-400"}`}>
                                                    {bp.revGrowth >= 0 ? <TrendUp className="h-3.5 w-3.5" /> : <TrendDown className="h-3.5 w-3.5" />}
                                                    {bp.revGrowth}%
                                                </span>
                                            </div>
                                            <p className="text-2xl font-bold mb-4">{formatETB(bp.revenue)} <span className="text-sm font-normal text-muted-foreground">ETB</span></p>
                                            <div className="grid grid-cols-4 gap-2 text-center">
                                                <div className="rounded-lg bg-muted/40 py-2">
                                                    <p className="text-xs font-bold">{bp.activeProjects}</p>
                                                    <p className="text-[10px] text-muted-foreground">Active</p>
                                                </div>
                                                <div className="rounded-lg bg-muted/40 py-2">
                                                    <p className="text-xs font-bold">{bp.closedDeals}</p>
                                                    <p className="text-[10px] text-muted-foreground">Closed</p>
                                                </div>
                                                <div className="rounded-lg bg-muted/40 py-2">
                                                    <p className="text-xs font-bold">{bp.contentPosts}</p>
                                                    <p className="text-[10px] text-muted-foreground">Posts</p>
                                                </div>
                                                <div className="rounded-lg bg-muted/40 py-2">
                                                    <p className="text-xs font-bold">{bp.engagement > 0 ? bp.engagement + "%" : "—"}</p>
                                                    <p className="text-[10px] text-muted-foreground">Eng.</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        ) : (
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-border/40 text-xs text-muted-foreground">
                                        <th className="text-left font-medium px-4 py-3">Freelancer</th>
                                        <th className="text-left font-medium px-4 py-3">Brands</th>
                                        <th className="text-center font-medium px-4 py-3">Projects</th>
                                        <th className="text-center font-medium px-4 py-3">Rating</th>
                                        <th className="text-center font-medium px-4 py-3">On-Time</th>
                                        <th className="text-right font-medium px-4 py-3">Earned (ETB)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredFreelancers.map(f => (
                                        <tr key={f.name} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                                            <td className="px-4 py-3.5">
                                                <p className="text-sm font-medium">{f.name}</p>
                                                <p className="text-[11px] text-muted-foreground">{f.role}</p>
                                            </td>
                                            <td className="px-4 py-3.5">
                                                <div className="flex gap-1">{f.brands.map(bid => <span key={bid} className={`h-2 w-2 rounded-full ${BRAND_MAP[bid].dotColor}`} title={BRAND_MAP[bid].shortName} />)}</div>
                                            </td>
                                            <td className="px-4 py-3.5 text-sm text-center font-semibold">{f.projects}</td>
                                            <td className="px-4 py-3.5 text-sm text-center font-semibold text-amber-500">{f.rating}</td>
                                            <td className="px-4 py-3.5 text-sm text-center">
                                                <span className={`font-semibold ${f.onTime >= 90 ? "text-emerald-500" : f.onTime >= 80 ? "text-amber-500" : "text-red-400"}`}>{f.onTime}%</span>
                                            </td>
                                            <td className="px-4 py-3.5 text-sm text-right font-semibold">{formatETB(f.earned)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>

                {/* Brand Detail Sheet */}
                <Sheet open={!!selectedBrand} onOpenChange={(open) => !open && setSelectedBrand(null)}>
                    <SheetContent className="sm:max-w-lg overflow-y-auto">
                        {selectedBrand && (() => {
                            const brand = BRAND_MAP[selectedBrand.brand]
                            return (
                                <>
                                    <SheetHeader>
                                        <div className="flex items-center gap-2">
                                            <span className={`h-3 w-3 rounded-full ${brand.dotColor}`} />
                                            <SheetTitle>{brand.name}</SheetTitle>
                                        </div>
                                    </SheetHeader>
                                    <div className="mt-6 space-y-6">
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="rounded-xl bg-muted/30 border border-border/40 p-4 text-center">
                                                <p className="text-2xl font-bold">{formatETB(selectedBrand.revenue)}</p>
                                                <p className="text-xs text-muted-foreground">Revenue (ETB)</p>
                                            </div>
                                            <div className="rounded-xl bg-muted/30 border border-border/40 p-4 text-center">
                                                <p className={`text-2xl font-bold ${selectedBrand.revGrowth >= 0 ? "text-emerald-500" : "text-red-400"}`}>{selectedBrand.revGrowth}%</p>
                                                <p className="text-xs text-muted-foreground">Growth</p>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Metrics</h4>
                                            <div className="space-y-3">
                                                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Active Projects</span><span className="font-semibold">{selectedBrand.activeProjects}</span></div>
                                                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Closed Deals</span><span className="font-semibold">{selectedBrand.closedDeals}</span></div>
                                                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Content Posts</span><span className="font-semibold">{selectedBrand.contentPosts}</span></div>
                                                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Avg Engagement</span><span className="font-semibold">{selectedBrand.engagement > 0 ? selectedBrand.engagement + "%" : "N/A"}</span></div>
                                                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Avg Project Value</span><span className="font-semibold">{formatETB(selectedBrand.avgProjectValue)} ETB</span></div>
                                                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Top Client</span><span className="font-semibold">{selectedBrand.topClient}</span></div>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Services</h4>
                                            <div className="flex flex-wrap gap-1.5">
                                                {brand.services.map(s => <span key={s} className={`${brand.textColor} bg-muted/40 px-2 py-0.5 rounded text-[10px] font-medium`}>{s}</span>)}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        })()}
                    </SheetContent>
                </Sheet>
            </SidebarInset>
        </SidebarProvider>
    )
}
