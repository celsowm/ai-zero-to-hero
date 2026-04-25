import React, { useState } from 'react';

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabbedVisualContainerProps {
  tabs: TabItem[];
  defaultTabId?: string;
}

/**
 * Shared tabbed layout for "Code vs Visual" tabs.
 * Eliminates duplicated useState<'code' | 'visual'> + TabsBar + TabbedPanelSurface patterns.
 */
export const TabbedVisualContainer: React.FC<TabbedVisualContainerProps> = ({
  tabs,
  defaultTabId,
}) => {
  const [activeTab, setActiveTab] = useState(defaultTabId ?? tabs[0]?.id ?? '');

  const activeContent = tabs.find(t => t.id === activeTab)?.content;

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="flex gap-1 shrink-0" role="tablist">
        {tabs.map(tab => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-1.5 rounded-t-lg text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-white/10 text-white'
                : 'text-white/50 hover:text-white/80 hover:bg-white/5'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="flex-1 min-h-0 rounded-b-lg border border-white/10 bg-white/5 overflow-auto">
        {activeContent}
      </div>
    </div>
  );
};
