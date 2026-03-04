"use client";

import { useState } from "react";
import {
  InboxIcon,
  SearchIcon,
  LayoutDashboardIcon,
  SettingsIcon,
  UserIcon,
  HomeIcon,
} from "lucide-react";
import {
  Button,
  Card,
  Input,
  Textarea,
  Select,
  Modal,
  Badge,
  Toggle,
  EmptyState,
  Skeleton,
  ProgressBar,
  Chip,
  Tabs,
} from "@/components/ui";
import { colors, typography, spacing, radii } from "@/lib/tokens";

const navSections = [
  { id: "colors", label: "Colors" },
  { id: "typography", label: "Typography" },
  { id: "spacing", label: "Spacing" },
  { id: "radius", label: "Border Radius" },
  { id: "buttons", label: "Buttons" },
  { id: "cards", label: "Cards" },
  { id: "forms", label: "Forms" },
  { id: "toggle", label: "Toggle" },
  { id: "progress", label: "Progress" },
  { id: "badges", label: "Badges & Chips" },
  { id: "tabs", label: "Tabs" },
  { id: "modal", label: "Modal" },
  { id: "empty", label: "Empty State" },
  { id: "skeleton", label: "Skeleton" },
];

function SectionWrapper({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mb-20 scroll-mt-24">
      <h2 className="text-h3 font-bold text-text-primary mb-1">{title}</h2>
      {description && (
        <p className="text-small text-text-secondary mb-6">{description}</p>
      )}
      <div className="h-px bg-border mb-8" />
      {children}
    </section>
  );
}

export default function DesignSystemPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [toggle1, setToggle1] = useState(false);
  const [toggle2, setToggle2] = useState(true);
  const [chips, setChips] = useState(["Design", "React", "TypeScript", "Next.js"]);

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-bg-primary border-b border-border px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-h5 font-bold text-text-primary">Design System</h1>
            <p className="text-caption text-text-muted">Space Grotesk · Minimal · Electric Blue</p>
          </div>
          <Badge variant="accent">v1.0</Badge>
        </div>
      </header>

      <div className="max-w-6xl mx-auto flex gap-12 px-6 py-12">
        {/* Sidebar nav */}
        <aside className="hidden lg:block w-48 shrink-0">
          <nav className="sticky top-24 flex flex-col gap-0.5">
            {navSections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="px-3 py-1.5 text-small text-text-muted hover:text-text-primary hover:bg-bg-secondary rounded-sm transition-colors duration-150"
              >
                {s.label}
              </a>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">

          {/* Colors */}
          <SectionWrapper id="colors" title="Colors" description="Token palette — single source of truth in globals.css @theme.">
            <div className="space-y-8">
              {Object.entries(colors).map(([group, items]) => (
                <div key={group}>
                  <p className="text-xsmall font-medium text-text-muted uppercase tracking-wider mb-3">
                    {group}
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {items.map((color) => (
                      <div key={color.name} className="flex flex-col gap-2">
                        <div
                          className="h-14 rounded-sm border border-border"
                          style={{ background: color.hex }}
                        />
                        <div>
                          <p className="text-xsmall font-medium text-text-primary">{color.label}</p>
                          <p className="text-caption text-text-muted font-mono">{color.hex}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </SectionWrapper>

          {/* Typography */}
          <SectionWrapper id="typography" title="Typography" description="Space Grotesk · loaded via next/font/google.">
            <div className="space-y-5">
              {typography.map((t) => (
                <div key={t.name} className="flex items-baseline gap-6 py-3 border-b border-border last:border-0">
                  <div className="w-20 shrink-0">
                    <p className="text-xsmall text-text-muted font-mono">{t.name}</p>
                    <p className="text-caption text-text-muted">{t.px}</p>
                  </div>
                  <p
                    className={`${t.className} font-medium text-text-primary leading-none`}
                    style={{ fontSize: t.size }}
                  >
                    The quick brown fox
                  </p>
                </div>
              ))}
            </div>
          </SectionWrapper>

          {/* Spacing */}
          <SectionWrapper id="spacing" title="Spacing" description="4px base unit · Tailwind default scale.">
            <div className="space-y-2">
              {spacing.map((s) => (
                <div key={s.name} className="flex items-center gap-4">
                  <span className="w-8 text-caption font-mono text-text-muted text-right">{s.name}</span>
                  <div
                    className="bg-accent-primary h-5 rounded-none"
                    style={{ width: s.value }}
                  />
                  <span className="text-caption text-text-muted">{s.px}</span>
                </div>
              ))}
            </div>
          </SectionWrapper>

          {/* Border Radius */}
          <SectionWrapper id="radius" title="Border Radius" description="Square-first aesthetic — minimal rounding.">
            <div className="flex flex-wrap gap-6">
              {radii.map((r) => (
                <div key={r.name} className="flex flex-col items-center gap-2">
                  <div
                    className="w-16 h-16 bg-bg-card border border-border"
                    style={{ borderRadius: r.value }}
                  />
                  <p className="text-caption font-mono text-text-muted">{r.name}</p>
                  <p className="text-caption text-text-muted">{r.px}</p>
                </div>
              ))}
            </div>
          </SectionWrapper>

          {/* Buttons */}
          <SectionWrapper id="buttons" title="Buttons" description="Variants: primary, secondary, ghost, danger, icon.">
            <div className="space-y-6">
              <div>
                <p className="text-xsmall text-text-muted mb-3">Variants</p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="danger">Danger</Button>
                  <Button variant="icon"><SearchIcon size={16} /></Button>
                </div>
              </div>
              <div>
                <p className="text-xsmall text-text-muted mb-3">Sizes</p>
                <div className="flex flex-wrap items-center gap-3">
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                </div>
              </div>
              <div>
                <p className="text-xsmall text-text-muted mb-3">States</p>
                <div className="flex flex-wrap gap-3">
                  <Button disabled>Disabled</Button>
                  <Button variant="secondary" disabled>Disabled Secondary</Button>
                </div>
              </div>
            </div>
          </SectionWrapper>

          {/* Cards */}
          <SectionWrapper id="cards" title="Cards" description="Variants: default, muted, outline.">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card variant="default">
                <p className="text-small font-semibold text-text-primary mb-1">Default</p>
                <p className="text-xsmall text-text-muted">bg-card + border</p>
              </Card>
              <Card variant="muted">
                <p className="text-small font-semibold text-text-primary mb-1">Muted</p>
                <p className="text-xsmall text-text-muted">bg-secondary, no border</p>
              </Card>
              <Card variant="outline">
                <p className="text-small font-semibold text-text-primary mb-1">Outline</p>
                <p className="text-xsmall text-text-muted">transparent bg + border</p>
              </Card>
              <Card hover>
                <p className="text-small font-semibold text-text-primary mb-1">Hover</p>
                <p className="text-xsmall text-text-muted">hover:shadow-card</p>
              </Card>
              <Card size="sm">
                <p className="text-small font-semibold text-text-primary mb-1">Small padding</p>
                <p className="text-xsmall text-text-muted">p-4</p>
              </Card>
              <Card size="lg">
                <p className="text-small font-semibold text-text-primary mb-1">Large padding</p>
                <p className="text-xsmall text-text-muted">p-8</p>
              </Card>
            </div>
          </SectionWrapper>

          {/* Forms */}
          <SectionWrapper id="forms" title="Forms" description="Input, Textarea, Select — with label and error states.">
            <div className="max-w-md space-y-5">
              <Input label="Email" placeholder="you@example.com" type="email" />
              <Input label="Search" variant="search" placeholder="Search..." />
              <Input label="With error" placeholder="Enter value" error="This field is required." />
              <Textarea label="Message" placeholder="Write something..." />
              <Select label="Category">
                <option value="">Select category...</option>
                <option value="design">Design</option>
                <option value="dev">Development</option>
                <option value="marketing">Marketing</option>
              </Select>
              <Select label="With error" error="Please select an option.">
                <option value="">Select...</option>
              </Select>
            </div>
          </SectionWrapper>

          {/* Toggle */}
          <SectionWrapper id="toggle" title="Toggle" description="role=switch, aria-checked, two sizes.">
            <div className="space-y-4">
              <Toggle checked={toggle1} onChange={setToggle1} label="Notifications" />
              <Toggle checked={toggle2} onChange={setToggle2} label="Dark mode" />
              <Toggle checked={true} onChange={() => {}} size="sm" label="Small toggle" />
              <Toggle checked={false} onChange={() => {}} disabled label="Disabled" />
            </div>
          </SectionWrapper>

          {/* Progress */}
          <SectionWrapper id="progress" title="Progress Bar" description="Variants and sizes.">
            <div className="max-w-md space-y-5">
              <ProgressBar value={65} showLabel />
              <ProgressBar value={80} variant="success" size="sm" showLabel />
              <ProgressBar value={40} variant="warning" size="md" showLabel />
              <ProgressBar value={20} variant="error" size="lg" showLabel />
            </div>
          </SectionWrapper>

          {/* Badges & Chips */}
          <SectionWrapper id="badges" title="Badges & Chips" description="Inline labels and removable tags.">
            <div className="space-y-6">
              <div>
                <p className="text-xsmall text-text-muted mb-3">Badges</p>
                <div className="flex flex-wrap gap-2">
                  <Badge>Default</Badge>
                  <Badge variant="accent">Accent</Badge>
                  <Badge variant="success">Success</Badge>
                  <Badge variant="warning">Warning</Badge>
                  <Badge variant="error">Error</Badge>
                  <Badge variant="outline">Outline</Badge>
                </div>
              </div>
              <div>
                <p className="text-xsmall text-text-muted mb-3">Chips (removable)</p>
                <div className="flex flex-wrap gap-2">
                  {chips.map((chip) => (
                    <Chip
                      key={chip}
                      label={chip}
                      variant="accent"
                      onRemove={() => setChips((prev) => prev.filter((c) => c !== chip))}
                    />
                  ))}
                  <Chip label="Success" variant="success" />
                  <Chip label="Warning" variant="warning" />
                  <Chip label="Error" variant="error" />
                </div>
              </div>
            </div>
          </SectionWrapper>

          {/* Tabs */}
          <SectionWrapper id="tabs" title="Tabs" description="Horizontal tabs with accent underline indicator.">
            <Tabs
              tabs={[
                { id: "overview", label: "Overview", content: <p className="text-small text-text-secondary">Overview content goes here.</p> },
                { id: "settings", label: "Settings", content: <p className="text-small text-text-secondary">Settings panel content.</p> },
                { id: "activity", label: "Activity", content: <p className="text-small text-text-secondary">Recent activity feed.</p> },
              ]}
            />
          </SectionWrapper>

          {/* Modal */}
          <SectionWrapper id="modal" title="Modal" description="Native <dialog> element with backdrop blur.">
            <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
            <Modal
              open={modalOpen}
              onClose={() => setModalOpen(false)}
              title="Confirm action"
            >
              <p className="text-small text-text-secondary mb-6">
                Are you sure you want to proceed? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <Button variant="secondary" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="danger" onClick={() => setModalOpen(false)}>
                  Confirm
                </Button>
              </div>
            </Modal>
          </SectionWrapper>

          {/* Empty State */}
          <SectionWrapper id="empty" title="Empty State" description="Icon + title + description + optional CTA.">
            <Card variant="outline">
              <EmptyState
                icon={<InboxIcon size={40} />}
                title="No items yet"
                description="Start by creating your first item. It'll appear here once added."
                action={<Button>Create item</Button>}
              />
            </Card>
          </SectionWrapper>

          {/* Skeleton */}
          <SectionWrapper id="skeleton" title="Skeleton" description="animate-pulse placeholder for loading states.">
            <div className="space-y-3 max-w-sm">
              <Skeleton height="20px" width="60%" />
              <Skeleton height="14px" width="100%" />
              <Skeleton height="14px" width="85%" />
              <Skeleton height="14px" width="70%" />
              <div className="flex gap-3 mt-4">
                <Skeleton height="36px" width="80px" />
                <Skeleton height="36px" width="80px" />
              </div>
            </div>
          </SectionWrapper>

        </main>
      </div>
    </div>
  );
}
