interface RangeCommonProps {
  label?: string;
  id: string;
  min: number;
  max: number;
}

export interface RangeProps extends RangeCommonProps {
  value: number;
  setter: (value: string)=>void;
}

export interface DoubleRangeProps extends RangeCommonProps {
  minValue: number;
  maxValue: number;
  minSetter: (value: string)=>void;
  maxSetter: (value: string)=>void;
}
