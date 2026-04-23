import { useBuildStore, type Role } from '@/store/useBuildStore';
import { Slider } from '@/components/inputs/Slider';

const ROLES: { id: Role; label: string }[] = [
  { id: 'owner', label: 'Owner' },
  { id: 'ops', label: 'Operations' },
  { id: 'it', label: 'IT' },
  { id: 'finance', label: 'Finance' },
  { id: 'other', label: 'Other' },
];

export function Step1About() {
  const business = useBuildStore((s) => s.business);
  const setBusiness = useBuildStore((s) => s.setBusiness);

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="fb-label">Business name</span>
        <input
          type="text"
          className="input mt-1"
          value={business.name}
          placeholder="Acme Dental Group"
          onChange={(e) => setBusiness({ name: e.target.value })}
        />
      </label>
      <label className="block">
        <span className="fb-label">Business address</span>
        <input
          type="text"
          className="input mt-1"
          value={business.address}
          placeholder="425 Peachtree St NE, Atlanta, GA"
          onChange={(e) => setBusiness({ address: e.target.value })}
        />
        <span className="fb-caption mt-1 block">Used for service availability + energy pricing.</span>
      </label>

      <Slider
        label="Team size"
        min={1}
        max={100}
        value={business.employees}
        onChange={(v) => setBusiness({ employees: v })}
        suffix={business.employees >= 100 ? 'people+' : 'people'}
        helper="Drives tier recommendations and per-seat pricing."
      />

      <div>
        <span className="fb-label block mb-2">Your role</span>
        <div className="flex flex-wrap gap-2">
          {ROLES.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => setBusiness({ role: r.id })}
              className={`chip ${business.role === r.id ? 'chip-selected' : ''}`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
