import { site } from '@/data/site';
import { Tag } from './Tag';

export function FocusTags({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="flex flex-wrap gap-2">
        {site.focusAreas.map((item) => (
          <Tag key={item}>{item}</Tag>
        ))}
      </div>
    </div>
  );
}
