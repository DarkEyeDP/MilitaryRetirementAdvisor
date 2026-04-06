import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from './ui/utils';

/**
 * Slider styled to match the gauge tip-dot pattern from StateDetail:
 * - Thick rounded fill bar (dark)
 * - White circle dot at the tip of the fill, no colored border
 * - Dot is slightly larger than bar height so it visually caps the fill end
 *
 * Also supports mouse scroll wheel and two-finger horizontal swipe to adjust value.
 */
function GaugeDotSlider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  step = 1,
  onValueChange,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const rootRef = React.useRef<HTMLSpanElement>(null);

  const handleWheel = React.useCallback(
    (e: WheelEvent) => {
      e.preventDefault();
      const current = (value as number[] | undefined)?.[0] ?? (defaultValue as number[] | undefined)?.[0] ?? min;
      // deltaX for two-finger swipe, deltaY for scroll wheel; right/down = decrease
      const delta = e.deltaX !== 0 ? -e.deltaX : -e.deltaY;
      const next = Math.min(max, Math.max(min, current + Math.sign(delta) * (step as number)));
      onValueChange?.([next]);
    },
    [value, defaultValue, min, max, step, onValueChange]
  );

  React.useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);

  return (
    <SliderPrimitive.Root
      ref={rootRef}
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      step={step}
      onValueChange={onValueChange}
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
