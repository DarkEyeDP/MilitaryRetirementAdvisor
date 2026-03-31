import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from './ui/utils';

/**
 * Slider styled to match the gauge tip-dot pattern from StateDetail:
 * - Thick rounded fill bar (dark)
 * - White circle dot at the tip of the fill, no colored border
 * - Dot is slightly larger than bar height so it visually caps the fill end
 */
function GaugeDotSlider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  return (
    <SliderPrimitive.Root
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        'relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50',
        className
      )}
      {...props}
    >
      {/* Track — gray background, same thick height as before */}
      <SliderPrimitive.Track className="relative h-4 w-full grow rounded-full bg-slate-200 overflow-hidden">
        {/* Fill */}
        <SliderPrimitive.Range className="absolute h-full rounded-full bg-slate-900" />
      </SliderPrimitive.Track>

      {/* Thumb — white circle, larger than track height, shadow only (no colored border) */}
      <SliderPrimitive.Thumb className="block size-6 rounded-full bg-white shadow-[0_1px_6px_rgba(0,0,0,0.25),0_0_0_2px_rgba(0,0,0,0.08)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 transition-shadow hover:shadow-[0_2px_8px_rgba(0,0,0,0.3),0_0_0_2px_rgba(0,0,0,0.12)]" />
    </SliderPrimitive.Root>
  );
}

export { GaugeDotSlider };
