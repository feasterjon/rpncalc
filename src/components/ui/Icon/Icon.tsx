import {
  AngleUpIcon,
  ArrowLeftIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CircleHalfStrokeIcon,
  ClipboardIcon,
  ClockIcon,
  CornerDownLeftIcon,
  DeleteLeftIcon,
  DivideIcon,
  EllipsisVerticalIcon,
  EpsilonIcon,
  EyeIcon,
  EyeSlashIcon,
  InformationCircleIcon,
  MinusIcon,
  MoonIcon,
  MultiplyIcon,
  PhiIcon,
  PiIcon,
  PlusIcon,
  QuestionMarkCircleIcon,
  SquareRootVariableIcon,
  SunIcon,
  TrashIcon,
  XMarkIcon
} from './icons/solid';
import type { Icon as IconType } from './types/icon';

type IconProps = IconType & {
  id?: string;
};

export function Icon({ id, styles = 'h-6 w-6' }: IconProps) {
  switch (id) {
    case 'AngleUp':
      return <AngleUpIcon styles={styles} />;
    case 'ArrowLeft':
      return <ArrowLeftIcon styles={styles} />;
    case 'Check':
      return <CheckIcon styles={styles} />;
    case 'ChevronDown':
      return <ChevronDownIcon styles={styles} />;
    case 'ChevronUp':
      return <ChevronUpIcon styles={styles} />;
    case 'CircleHalfStroke':
      return <CircleHalfStrokeIcon styles={styles} />;
    case 'Clipboard':
      return <ClipboardIcon styles={styles} />;
    case 'Clock':
      return <ClockIcon styles={styles} />;
    case 'CornerDownLeft':
      return <CornerDownLeftIcon styles={styles} />;
    case 'DeleteLeft':
      return <DeleteLeftIcon styles={styles} />;
    case 'Divide':
      return <DivideIcon styles={styles} />;
    case 'EllipsisVertical':
      return <EllipsisVerticalIcon styles={styles} />;
    case 'Epsilon':
      return <EpsilonIcon styles={styles} />;
    case 'Eye':
      return <EyeIcon styles={styles} />;
    case 'EyeSlash':
      return <EyeSlashIcon styles={styles} />;
    case 'Minus':
      return <MinusIcon styles={styles} />;
    case 'Moon':
      return <MoonIcon styles={styles} />;
    case 'Multiply':
      return <MultiplyIcon styles={styles} />;
    case 'Phi':
      return <PhiIcon styles={styles} />;
    case 'Pi':
      return <PiIcon styles={styles} />;
    case 'Plus':
      return <PlusIcon styles={styles} />;
    case 'QuestionMarkCircle':
      return <QuestionMarkCircleIcon styles={styles} />;
    case 'SquareRootVariable':
      return <SquareRootVariableIcon styles={styles} />;
    case 'Sun':
      return <SunIcon styles={styles} />;
    case 'Trash':
      return <TrashIcon styles={styles} />;
    case 'XMark':
      return <XMarkIcon styles={styles} />;
    default:
      return <InformationCircleIcon styles={styles} />;
  }
}