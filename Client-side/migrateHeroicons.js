import fs from "fs";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

if (!fs.existsSync("package.json")) {
  console.error("❌ Cannot find package.json — run this script from your project root.");
  process.exit(1);
}

const packageJson = fs.readFileSync("package.json", "utf8");
let framework;
if (packageJson.includes("heroicons/react")) framework = "react";
else if (packageJson.includes("heroicons/vue")) framework = "vue";
else {
  console.error("❌ No heroicons dependency found in package.json.");
  process.exit(1);
}

// Suggest install command for the latest Heroicons
if (fs.existsSync("yarn.lock")) {
  console.error("➡️ Detected yarn — run:");
  console.log(`  yarn add @heroicons/${framework}@latest`);
} else {
  console.error("➡️ Detected npm — run:");
  console.log(`  npm install @heroicons/${framework}@latest`);
}

// Helper to emit sed-based find-and-replace commands
function gsub(from, to) {
  console.log(`\n# Replace: ${from} → ${to}`);
  console.log(
    `find . -type f \\( -name '*.js' -o -name '*.jsx' -o -name '*.ts' -o -name '*.tsx' -o -name '*.vue' \\) \\! -path '*/node_modules/*' -exec sed -i '' -e 's|${from}|${to}|g' {} +`
  );
}

// 1️⃣ Update import paths
gsub(`@heroicons/${framework}/solid`, `@heroicons/${framework}/20/solid`);
gsub(`@heroicons/${framework}/outline`, `@heroicons/${framework}/24/outline`);

// 2️⃣ Rename icon symbols from v1 to v2
const heroiconsV1toV2 = {
  AdjustmentsIcon: "AdjustmentsVerticalIcon",
  AnnotationIcon: "ChatBubbleBottomCenterTextIcon",
  ArchiveIcon: "ArchiveBoxIcon",
  ArrowCircleDownIcon: "ArrowDownCircleIcon",
  ArrowCircleLeftIcon: "ArrowLeftCircleIcon",
  ArrowCircleRightIcon: "ArrowRightCircleIcon",
  ArrowCircleUpIcon: "ArrowUpCircleIcon",
  ArrowNarrowDownIcon: "ArrowLongDownIcon",
  ArrowNarrowLeftIcon: "ArrowLongLeftIcon",
  ArrowNarrowRightIcon: "ArrowLongRightIcon",
  ArrowNarrowUpIcon: "ArrowLongUpIcon",
  ArrowsExpandIcon: "ArrowsPointingOutIcon",
  ArrowSmDownIcon: "ArrowSmallDownIcon",
  ArrowSmLeftIcon: "ArrowSmallLeftIcon",
  ArrowSmRightIcon: "ArrowSmallRightIcon",
  ArrowSmUpIcon: "ArrowSmallUpIcon",
  BadgeCheckIcon: "CheckBadgeIcon",
  BanIcon: "NoSymbolIcon",
  BookmarkAltIcon: "BookmarkSquareIcon",
  CashIcon: "BanknotesIcon",
  ChartSquareBarIcon: "ChartBarSquareIcon",
  ChatAlt2Icon: "ChatBubbleLeftRightIcon",
  ChatAltIcon: "ChatBubbleLeftEllipsisIcon",
  ChatIcon: "ChatBubbleOvalLeftEllipsisIcon",
  ChipIcon: "CpuChipIcon",
  ClipboardCheckIcon: "ClipboardDocumentCheckIcon",
  ClipboardCopyIcon: "ClipboardDocumentIcon",
  ClipboardListIcon: "ClipboardDocumentListIcon",
  CloudDownloadIcon: "CloudArrowDownIcon",
  CloudUploadIcon: "CloudArrowUpIcon",
  CodeIcon: "CodeBracketIcon",
  CollectionIcon: "RectangleStackIcon",
  ColorSwatchIcon: "SwatchIcon",
  CursorClickIcon: "CursorArrowRaysIcon",
  DatabaseIcon: "CircleStackIcon",
  DesktopComputerIcon: "ComputerDesktopIcon",
  DeviceMobileIcon: "DevicePhoneMobileIcon",
  DocumentAddIcon: "DocumentPlusIcon",
  DocumentDownloadIcon: "DocumentArrowDownIcon",
  DocumentRemoveIcon: "DocumentMinusIcon",
  DocumentReportIcon: "DocumentChartBarIcon",
  DocumentSearchIcon: "DocumentMagnifyingGlassIcon",
  DotsCircleHorizontalIcon: "EllipsisHorizontalCircleIcon",
  DotsHorizontalIcon: "EllipsisHorizontalIcon",
  DotsVerticalIcon: "EllipsisVerticalIcon",
  DownloadIcon: "ArrowDownTrayIcon",
  DuplicateIcon: "Square2StackIcon",
  EmojiHappyIcon: "FaceSmileIcon",
  EmojiSadIcon: "FaceFrownIcon",
  ExclamationIcon: "ExclamationTriangleIcon",
  ExternalLinkIcon: "ArrowTopRightOnSquareIcon",
  EyeOffIcon: "EyeSlashIcon",
  FastForwardIcon: "ForwardIcon",
  FilterIcon: "FunnelIcon",
  FolderAddIcon: "FolderPlusIcon",
  FolderDownloadIcon: "FolderArrowDownIcon",
  FolderRemoveIcon: "FolderMinusIcon",
  GlobeIcon: "GlobeAmericasIcon",
  HandIcon: "HandRaisedIcon",
  InboxInIcon: "InboxArrowDownIcon",
  LibraryIcon: "BuildingLibraryIcon",
  LightningBoltIcon: "BoltIcon",
  LocationMarkerIcon: "MapPinIcon",
  LoginIcon: "ArrowLeftOnRectangleIcon",
  LogoutIcon: "ArrowRightOnRectangleIcon",
  MailIcon: "EnvelopeIcon",
  MailOpenIcon: "EnvelopeOpenIcon",
  MenuAlt1Icon: "Bars3CenterLeftIcon",
  MenuAlt2Icon: "Bars3BottomLeftIcon",
  MenuAlt3Icon: "Bars3BottomRightIcon",
  MenuAlt4Icon: "Bars2Icon",
  MenuIcon: "Bars3Icon",
  MinusSmIcon: "MinusSmallIcon",
  MusicNoteIcon: "MusicalNoteIcon",
  OfficeBuildingIcon: "BuildingOfficeIcon",
  PencilAltIcon: "PencilSquareIcon",
  PhoneIncomingIcon: "PhoneArrowDownLeftIcon",
  PhoneMissedCallIcon: "PhoneXMarkIcon",
  PhoneOutgoingIcon: "PhoneArrowUpRightIcon",
  PhotographIcon: "PhotoIcon",
  PlusSmIcon: "PlusSmallIcon",
  PuzzleIcon: "PuzzlePieceIcon",
  QrcodeIcon: "QrCodeIcon",
  ReceiptTaxIcon: "ReceiptPercentIcon",
  RefreshIcon: "ArrowPathIcon",
  ReplyIcon: "ArrowUturnLeftIcon",
  RewindIcon: "BackwardIcon",
  SaveAsIcon: "ArrowDownOnSquareStackIcon",
  SaveIcon: "ArrowDownOnSquareIcon",
  SearchCircleIcon: "MagnifyingGlassCircleIcon",
  SearchIcon: "MagnifyingGlassIcon",
  SelectorIcon: "ChevronUpDownIcon",
  SortAscendingIcon: "BarsArrowUpIcon",
  SortDescendingIcon: "BarsArrowDownIcon",
  SpeakerphoneIcon: "MegaphoneIcon",
  StatusOfflineIcon: "SignalSlashIcon",
  StatusOnlineIcon: "SignalIcon",
  SupportIcon: "LifebuoyIcon",
  SwitchHorizontalIcon: "ArrowsRightLeftIcon",
  SwitchVerticalIcon: "ArrowsUpDownIcon",
  TableIcon: "TableCellsIcon",
  TemplateIcon: "RectangleGroupIcon",
  TerminalIcon: "CommandLineIcon",
  ThumbDownIcon: "HandThumbDownIcon",
  ThumbUpIcon: "HandThumbUpIcon",
  TranslateIcon: "LanguageIcon",
  TrendingDownIcon: "ArrowTrendingDownIcon",
  TrendingUpIcon: "ArrowTrendingUpIcon",
  UploadIcon: "ArrowUpTrayIcon",
  UserAddIcon: "UserPlusIcon",
  UserRemoveIcon: "UserMinusIcon",
  ViewBoardsIcon: "ViewColumnsIcon",
  ViewGridAddIcon: "SquaresPlusIcon",
  ViewGridIcon: "Squares2X2Icon",
  ViewListIcon: "Bars4Icon",
  VolumeOffIcon: "SpeakerXMarkIcon",
  VolumeUpIcon: "SpeakerWaveIcon",
  XIcon: "XMarkIcon",
  ZoomInIcon: "MagnifyingGlassPlusIcon",
  ZoomOutIcon: "MagnifyingGlassMinusIcon"
};

console.log("\n# Icon Name Mappings:");
for (const [from, to] of Object.entries(heroiconsV1toV2)) {
  gsub(from, to);
}

console.log("\n✅ Done! Copy the above commands, run them in Git Bash (or PowerShell), then reinstall and restart your app.");
