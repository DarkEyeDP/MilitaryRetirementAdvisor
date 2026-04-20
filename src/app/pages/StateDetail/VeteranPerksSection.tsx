import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../../components/ui/accordion';
import { SiteLogo } from '../../components/ui/SiteLogo';
import type { StateData } from '../../data/stateData';
import type { VeteranPerksData } from '../../data/veteranPerksData';
import { stateVeteranUrls } from '../../data/stateVeteranUrls';

interface VeteranPerksSectionProps {
  state: StateData;
  perks: VeteranPerksData;
  scrollRef: React.RefObject<HTMLDivElement | null>;
}

export function VeteranPerksSection({ state, perks, scrollRef }: VeteranPerksSectionProps) {
  const sections = [
    { value: 'prop-tax', label: 'Property Tax Exemption (100% VA Disability)', items: perks.propertyTaxExemptions,       checkClass: state.propertyTaxExemption100 === 'Full' ? 'text-green-600' : 'text-yellow-500', pillClass: state.propertyTaxExemption100 === 'Full' ? 'bg-green-50 text-green-900' : state.propertyTaxExemption100 === 'Partial' ? 'bg-yellow-50 text-yellow-900' : 'bg-slate-50 text-slate-700' },
    { value: 'dl',       label: "Driver's License & Vehicle Registration",      items: perks.vehicleRegistrationBenefits, checkClass: 'text-green-600',   pillClass: 'bg-slate-50 text-slate-700'   },
    { value: 'medal',    label: 'Military Medal & Honor Benefits',               items: perks.medalBenefits,               checkClass: 'text-yellow-500',  pillClass: 'bg-slate-50 text-slate-700'   },
    { value: 'edu-r',    label: 'Education Benefits — Retiree',                  items: perks.educationBenefits.retiree,   checkClass: 'text-blue-600',    pillClass: 'bg-blue-50 text-blue-900'     },
    { value: 'edu-f',    label: 'Education Benefits — Spouse & Dependents',      items: perks.educationBenefits.family,    checkClass: 'text-purple-600',  pillClass: 'bg-purple-50 text-purple-900' },
  ].filter((s) => s.items.length > 0);

  if (sections.length === 0) return null;

  return (
    <div ref={scrollRef}>
      <Card>
        <CardHeader className="border-b">
          <CardTitle className="flex items-center gap-2">
            <SiteLogo className="w-5 h-5" />
            Veteran Perks &amp; Benefits
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Accordion type="single" collapsible>
            {sections.map((section) => (
              <AccordionItem key={section.value} value={section.value} className="border-0 px-6 data-[state=closed]:hover:bg-slate-50 transition-colors">
                <AccordionTrigger className="hover:no-underline py-4 gap-3 border-t border-slate-200">
                  <span className="text-sm font-semibold text-slate-700 flex-1 text-left">{section.label}</span>
                  <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full mr-2 tabular-nums">
                    {section.items.length} item{section.items.length !== 1 ? 's' : ''}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-4">
                  <ul className="space-y-2">
                    {section.items.map((item, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.04, duration: 0.18 }}
                        className={`flex items-start gap-3 p-3 rounded-lg text-sm ${section.pillClass}`}
                      >
                        <CheckCircle2 className={`w-4 h-4 flex-shrink-0 mt-0.5 ${section.checkClass}`} />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="px-6 pb-2 pt-1">
            <p className="text-xs text-slate-400">
              Verify current eligibility requirements with your state DMV and official veteran services office.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
