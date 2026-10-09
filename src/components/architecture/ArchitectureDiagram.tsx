import React from 'react';
import { ArrowDownIcon, ArrowRightIcon } from 'lucide-react';
import { architectureConnectors, architectureLayers } from '../../data/architecture';

interface ArchitectureDiagramProps {
  /** Always render horizontally (used in the full-size view). */
  wide?: boolean;
}

export function ArchitectureDiagram({ wide = false }: ArchitectureDiagramProps) {
  const row = wide ? 'flex flex-row items-stretch' : 'flex flex-col xl:flex-row xl:items-stretch';
  const showRight = wide ? 'flex' : 'hidden xl:flex';
  const showDown = wide ? 'hidden' : 'flex xl:hidden';

  return (
    <div className={row}>
      {architectureLayers.map((layer, i) => {
        const Icon = layer.icon;
        const connector = architectureConnectors[i];
        return (
          <React.Fragment key={layer.id}>
            <section aria-label={`Layer ${i + 1}: ${layer.title}`} className="flex-1 min-w-0 rounded-xl border border-line bg-white p-4 xl:p-5">
              <div className="flex items-center gap-3 border-b border-line pb-4">
                <span className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-brand text-ink">
                  <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-brand-ink">Layer {i + 1}</p>
                  <h3 className="text-base font-semibold leading-tight text-ink">{layer.title}</h3>
                </div>
              </div>
              <ul className="mt-4 space-y-3">
                {layer.items.map((item) =>
                <li key={item.name} className="flex gap-2.5">
                    <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-brand" aria-hidden="true" />
                    <span className="min-w-0">
                      <span className="block text-sm xl:text-[15px] font-medium leading-snug text-ink">{item.name}</span>
                      {item.role && <span className="block text-xs xl:text-sm text-muted">{item.role}</span>}
                    </span>
                  </li>
                )}
              </ul>
            </section>
            {connector &&
            <>
                <div className={`${showRight} w-14 xl:w-16 2xl:w-24 flex-none flex-col items-center justify-center gap-1 px-1`} aria-hidden="true">
                  <ArrowRightIcon className="h-4 w-4 xl:h-5 xl:w-5 text-brand-ink" />
                  <span className="text-center text-xs xl:text-[13px] font-medium leading-tight text-muted">{connector}</span>
                </div>
                <div className={`${showDown} items-center gap-3 py-3 pl-4 sm:pl-6`} aria-hidden="true">
                  <ArrowDownIcon className="h-5 w-5 text-brand-ink" />
                  <span className="text-sm font-medium text-muted">{connector}</span>
                </div>
              </>
            }
          </React.Fragment>);

      })}
    </div>);

}