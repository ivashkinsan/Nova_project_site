/** Barrel exports for all data files */

export { bandMembers, homeBandMembers } from './bandMembers';
export type { BandMember } from './bandMembers';

export { repertoire } from './repertoire';
export type { RepertoireItem } from './repertoire';

export { contactInfo } from './contacts';

export { headerNavItems, footerNavItems, sectionNavItems, footerSectionLinks } from './navigation';
export type { PageKey, NavItem, FooterNavItem, SectionNavItem } from './navigation';

export { formatOptions as homeFormatOptions } from './format';
export type { FormatOption as HomeFormatOption } from './format';

export { pricing, includedItems, riderNote } from './pricing';

export { aboutText, teamNote } from './about';

export { eventTypes, formatOptions as bookingFormatOptions, initialBookingForm } from './booking';
export type { EventType, FormatOption as BookingFormatOption, BookingFormFields } from './booking';

export { tracks } from './audio';
export type { Track } from './audio';

export { marqueeItems, heroMeta, heroGenres, bookingSteps } from './content';

export {
  heroPhoto,
  aboutPhotos,
  repertoirePhotos,
  audioPhoto,
  formatPhotos,
  pricingPhoto,
  bookingPhoto,
  contactPhoto,
  galleryPhotos,
  GALLERY_INITIAL_COUNT,
} from './photos';
export type { PhotoAsset } from './photos';
