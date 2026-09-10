function Button() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 px-[12px] py-[6px] rounded-[4px] top-0" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px] text-center whitespace-nowrap">← Back</p>
    </div>
  );
}

function Container() {
  return (
    <div className="h-[27.988px] relative shrink-0 w-full" data-name="Container">
      <Button />
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[0] not-italic relative shrink-0 text-[#101828] text-[0px] whitespace-nowrap">
        <span className="leading-[28px] text-[20px]">{`BMW 320i `}</span>
        <span className="font-['Inter:Regular',sans-serif] font-normal leading-[28px] text-[#99a1af] text-[20px]">2018</span>
      </p>
    </div>
  );
}

function Code() {
  return (
    <div className="bg-[#f3f4f6] content-stretch flex flex-col items-start px-[8px] py-[2px] relative rounded-[4px] shrink-0" data-name="Code">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#364153] text-[12px] tracking-[0.3px] whitespace-nowrap">ABC 123</p>
    </div>
  );
}

function Text() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#99a1af] text-[14px] whitespace-nowrap">Silver</p>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex gap-[12px] h-[24px] items-center pt-[4px] relative shrink-0 w-[151.088px]" data-name="Container">
      <Code />
      <Text />
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[151.088px]" data-name="Container">
      <Heading1 />
      <Container3 />
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#eef3fb] border-[#0f2340] border-[0.8px] border-solid content-stretch flex items-center justify-center px-[16px] py-[8px] relative rounded-[4px] shrink-0" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#0f2340] text-[14px] text-center whitespace-nowrap">+ New Job Order</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex h-[76px] items-start justify-between pt-[24px] relative shrink-0 w-[922.4px]" data-name="Container">
      <Container2 />
      <Button1 />
    </div>
  );
}

function VehicleDetail1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="VehicleDetail">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[#99a1af] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap">Vehicle Details</p>
    </div>
  );
}

function Text1() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#6a7282] text-[14px] whitespace-nowrap">VIN</p>
    </div>
  );
}

function Code1() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative shrink-0" data-name="Code">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#364153] text-[12px] tracking-[0.3px] whitespace-nowrap">WBA8E9C57JA123456</p>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex h-[20px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Text1 />
      <Code1 />
    </div>
  );
}

function Text2() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#6a7282] text-[14px] whitespace-nowrap">Color</p>
    </div>
  );
}

function Text3() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] whitespace-nowrap">Silver</p>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex h-[30px] items-start justify-between pt-[10px] relative shrink-0 w-[411.6px]" data-name="Container">
      <Text2 />
      <Text3 />
    </div>
  );
}

function Text4() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#6a7282] text-[14px] whitespace-nowrap">Odometer</p>
    </div>
  );
}

function Text5() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#101828] text-[14px] whitespace-nowrap">125,430 km</p>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex h-[30px] items-start justify-between pt-[10px] relative shrink-0 w-[411.6px]" data-name="Container">
      <Text4 />
      <Text5 />
    </div>
  );
}

function VehicleDetail2() {
  return (
    <div className="content-stretch flex flex-col h-[92px] items-start pt-[12px] relative shrink-0 w-[411.6px]" data-name="VehicleDetail">
      <Container5 />
      <Container6 />
      <Container7 />
    </div>
  );
}

function Card() {
  return (
    <div className="bg-white border-[#e5e7eb] border-[0.8px] border-solid col-1 content-stretch flex flex-col items-start justify-self-stretch p-[20px] relative rounded-[10px] row-1 self-stretch shrink-0" data-name="Card">
      <VehicleDetail1 />
      <VehicleDetail2 />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[#99a1af] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap">Owner</p>
    </div>
  );
}

function Button2() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0" data-name="Button">
      <p className="[text-underline-position:from-font] [word-break:break-word] decoration-from-font decoration-solid font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#254e87] text-[12px] text-center underline whitespace-nowrap">Edit</p>
    </div>
  );
}

function VehicleDetail3() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="VehicleDetail">
      <Paragraph />
      <Button2 />
    </div>
  );
}

function VehicleDetail4() {
  return (
    <div className="content-stretch flex flex-col h-[36px] items-start pt-[12px] relative shrink-0 w-[411.6px]" data-name="VehicleDetail">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[#101828] text-[16px] whitespace-nowrap">Ahmed Mohamed</p>
    </div>
  );
}

function VehicleDetail5() {
  return (
    <div className="content-stretch flex flex-col h-[24px] items-start pt-[4px] relative shrink-0 w-[411.6px]" data-name="VehicleDetail">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#6a7282] text-[14px] whitespace-nowrap">01012345678</p>
    </div>
  );
}

function VehicleDetail6() {
  return (
    <div className="absolute h-[15.988px] left-0 top-[12px] w-[137.7px]" data-name="VehicleDetail">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[69.5px] not-italic text-[#254e87] text-[12px] text-center top-0 whitespace-nowrap">View customer profile →</p>
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Container">
      <VehicleDetail6 />
    </div>
  );
}

function Card1() {
  return (
    <div className="bg-white border-[#e5e7eb] border-[0.8px] border-solid col-2 content-stretch flex flex-col items-start justify-self-stretch p-[20px] relative rounded-[10px] row-1 self-stretch shrink-0" data-name="Card">
      <VehicleDetail3 />
      <VehicleDetail4 />
      <VehicleDetail5 />
      <Container8 />
    </div>
  );
}

function Container4() {
  return (
    <div className="gap-x-[16px] gap-y-[16px] grid grid-cols-[__453.20px_453.20px] grid-rows-[_149.59px] relative shrink-0 w-full" data-name="Container">
      <Card />
      <Card1 />
    </div>
  );
}

function ContainerMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[24px] relative shrink-0 w-full" data-name="Container:margin">
      <Container4 />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap">Total Visits</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="content-stretch flex flex-col h-[36px] items-start pt-[4px] relative shrink-0 w-[87.162px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[32px] not-italic relative shrink-0 text-[#0f2340] text-[24px] whitespace-nowrap">7</p>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[87.162px]" data-name="Container">
      <Paragraph1 />
      <Paragraph2 />
    </div>
  );
}

function Text6() {
  return (
    <div className="content-stretch flex flex-col items-start opacity-50 relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[#111827] text-[20px] whitespace-nowrap">◫</p>
    </div>
  );
}

function KpiCard() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="KpiCard">
      <Container10 />
      <Text6 />
    </div>
  );
}

function Card2() {
  return (
    <div className="bg-white border-[#e5e7eb] border-[0.8px] border-solid col-1 content-stretch flex flex-col items-start justify-self-stretch p-[20px] relative rounded-[10px] row-1 self-stretch shrink-0" data-name="Card">
      <KpiCard />
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap">Last Service</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="content-stretch flex flex-col h-[36px] items-start pt-[4px] relative shrink-0 w-[151.55px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[32px] not-italic relative shrink-0 text-[#0f2340] text-[24px] whitespace-nowrap">08 Aug 2026</p>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[151.55px]" data-name="Container">
      <Paragraph3 />
      <Paragraph4 />
    </div>
  );
}

function KpiCard1() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="KpiCard">
      <Container11 />
    </div>
  );
}

function Card3() {
  return (
    <div className="bg-white border-[#e5e7eb] border-[0.8px] border-solid col-2 content-stretch flex flex-col items-start justify-self-stretch p-[20px] relative rounded-[10px] row-1 self-stretch shrink-0" data-name="Card">
      <KpiCard1 />
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap">Completed Items</p>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="content-stretch flex flex-col h-[36px] items-start pt-[4px] relative shrink-0 w-[123.65px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[32px] not-italic relative shrink-0 text-[#008236] text-[24px] whitespace-nowrap">0</p>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[123.65px]" data-name="Container">
      <Paragraph5 />
      <Paragraph6 />
    </div>
  );
}

function Text7() {
  return (
    <div className="content-stretch flex flex-col items-start opacity-50 relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[#111827] text-[20px] whitespace-nowrap">✓</p>
    </div>
  );
}

function KpiCard2() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="KpiCard">
      <Container12 />
      <Text7 />
    </div>
  );
}

function Card4() {
  return (
    <div className="bg-white border-[#e5e7eb] border-[0.8px] border-solid col-3 content-stretch flex flex-col items-start justify-self-stretch p-[20px] relative rounded-[10px] row-1 self-stretch shrink-0" data-name="Card">
      <KpiCard2 />
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap">Deferred Items</p>
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="content-stretch flex flex-col h-[36px] items-start pt-[4px] relative shrink-0 w-[110.3px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[32px] not-italic relative shrink-0 text-[#bb4d00] text-[24px] whitespace-nowrap">2</p>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[110.3px]" data-name="Container">
      <Paragraph7 />
      <Paragraph8 />
    </div>
  );
}

function KpiCard3() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="KpiCard">
      <Container13 />
    </div>
  );
}

function Card5() {
  return (
    <div className="bg-white border-[#e5e7eb] border-[0.8px] border-solid col-4 content-stretch flex flex-col items-start justify-self-stretch p-[20px] relative rounded-[10px] row-1 self-stretch shrink-0" data-name="Card">
      <KpiCard3 />
    </div>
  );
}

function Container9() {
  return (
    <div className="gap-x-[16px] gap-y-[16px] grid grid-cols-[____218.60px_218.60px_218.60px_218.60px] grid-rows-[_93.57px] relative shrink-0 w-full" data-name="Container">
      <Card2 />
      <Card3 />
      <Card4 />
      <Card5 />
    </div>
  );
}

function ContainerMargin1() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[24px] relative shrink-0 w-full" data-name="Container:margin">
      <Container9 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 2">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[#1e2939] text-[14px] tracking-[0.7px] uppercase whitespace-nowrap">Service History</p>
    </div>
  );
}

function SectionHeader() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="SectionHeader">
      <Heading2 />
    </div>
  );
}

function HeaderCell() {
  return (
    <div className="absolute bg-[#f9fafb] border-[#f3f4f6] border-b-[0.8px] border-solid h-[36.388px] left-0 top-0 w-[225.137px]" data-name="Header Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] left-[16px] not-italic text-[#6a7282] text-[12px] top-[10px] tracking-[0.6px] uppercase whitespace-nowrap">Job Order</p>
    </div>
  );
}

function HeaderCell1() {
  return (
    <div className="absolute bg-[#f9fafb] border-[#f3f4f6] border-b-[0.8px] border-solid h-[36.388px] left-[225.14px] top-0 w-[200.313px]" data-name="Header Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] left-[16px] not-italic text-[#6a7282] text-[12px] top-[10px] tracking-[0.6px] uppercase whitespace-nowrap">Date</p>
    </div>
  );
}

function HeaderCell2() {
  return (
    <div className="absolute bg-[#f9fafb] border-[#f3f4f6] border-b-[0.8px] border-solid h-[36.388px] left-[425.45px] top-0 w-[157.85px]" data-name="Header Cell">
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] left-[142.14px] not-italic text-[#6a7282] text-[12px] text-right top-[10px] tracking-[0.6px] uppercase whitespace-nowrap">KM</p>
    </div>
  );
}

function HeaderCell3() {
  return (
    <div className="absolute bg-[#f9fafb] border-[#f3f4f6] border-b-[0.8px] border-solid h-[36.388px] left-[583.3px] top-0 w-[194.15px]" data-name="Header Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] left-[16px] not-italic text-[#6a7282] text-[12px] top-[10px] tracking-[0.6px] uppercase whitespace-nowrap">Inspection</p>
    </div>
  );
}

function HeaderCell4() {
  return (
    <div className="absolute bg-[#f9fafb] border-[#f3f4f6] border-b-[0.8px] border-solid h-[36.388px] left-[777.45px] top-0 w-[143.35px]" data-name="Header Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] left-[16px] not-italic text-[#6a7282] text-[12px] top-[10px] tracking-[0.6px] uppercase whitespace-nowrap">Status</p>
    </div>
  );
}

function TableCell() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[46.788px] left-0 top-[36.39px] w-[225.137px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Bold',sans-serif] font-bold leading-[16px] left-[16px] text-[#0f2340] text-[12px] top-[15.59px] tracking-[0.3px] whitespace-nowrap">JO-2026-00125</p>
    </div>
  );
}

function TableCell1() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[46.788px] left-[225.14px] top-[36.39px] w-[200.313px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[#364153] text-[14px] top-[13.99px] whitespace-nowrap">12 Aug 2026</p>
    </div>
  );
}

function TableCell2() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[46.788px] left-[425.45px] top-[36.39px] w-[157.85px]" data-name="Table Cell">
      <p className="-translate-x-full [word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[20px] left-[142.05px] text-[#364153] text-[14px] text-right top-[13.19px] whitespace-nowrap">125,430</p>
    </div>
  );
}

function TableCell3() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[46.788px] left-[583.3px] top-[36.39px] w-[194.15px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[#364153] text-[14px] top-[13.99px] whitespace-nowrap">0/4 items</p>
    </div>
  );
}

function Text8() {
  return (
    <div className="absolute bg-[#eff6ff] border-[#bedbff] border-[0.8px] border-solid content-stretch flex items-start left-[16px] px-[8px] py-[2px] rounded-[4px] top-[12.8px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#1447e6] text-[12px] whitespace-nowrap">Open</p>
    </div>
  );
}

function TableCell4() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[46.788px] left-[777.45px] top-[36.39px] w-[143.35px]" data-name="Table Cell">
      <Text8 />
    </div>
  );
}

function Table() {
  return (
    <div className="h-[83.575px] overflow-clip relative shrink-0 w-full" data-name="Table">
      <HeaderCell />
      <HeaderCell1 />
      <HeaderCell2 />
      <HeaderCell3 />
      <HeaderCell4 />
      <TableCell />
      <TableCell1 />
      <TableCell2 />
      <TableCell3 />
      <TableCell4 />
    </div>
  );
}

function Card6() {
  return (
    <div className="bg-white border-[#e5e7eb] border-[0.8px] border-solid content-stretch flex flex-col items-start relative rounded-[10px] shrink-0 w-full" data-name="Card">
      <Table />
    </div>
  );
}

function CardMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[16px] relative shrink-0 w-full" data-name="Card:margin">
      <Card6 />
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col h-[145.175px] items-start pt-[24px] relative shrink-0 w-[922.4px]" data-name="Container">
      <SectionHeader />
      <CardMargin />
    </div>
  );
}

function VehicleDetail() {
  return (
    <div className="content-stretch flex flex-col h-[612.325px] items-start max-w-[1280px] pb-[48px] pt-[24px] px-[24px] relative shrink-0 w-[970.4px]" data-name="VehicleDetail">
      <Container />
      <Container1 />
      <ContainerMargin />
      <ContainerMargin1 />
      <Container14 />
    </div>
  );
}

function App() {
  return (
    <div className="bg-[#f3f4f6] content-stretch flex flex-col h-[688px] items-start pl-[224px] pt-[56px] relative shrink-0 w-[1194.4px]" data-name="App">
      <VehicleDetail />
    </div>
  );
}

function Container16() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[28px]" data-name="Container">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Bold',sans-serif] font-bold leading-[16px] relative shrink-0 text-[12px] text-[rgba(255,255,255,0.9)] whitespace-nowrap">SA</p>
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="content-stretch flex flex-col h-[15px] items-start overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15px] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap">Star Auto Center</p>
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="content-stretch flex flex-col h-[17px] items-start pt-[2px] relative shrink-0 w-[96.563px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[10px] text-[rgba(255,255,255,0.4)] tracking-[0.5px] uppercase whitespace-nowrap">Engineer</p>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[96.563px]" data-name="Container">
      <Paragraph9 />
      <Paragraph10 />
    </div>
  );
}

function Container15() {
  return (
    <div className="border-[rgba(255,255,255,0.1)] border-b-[0.8px] border-solid content-stretch flex gap-[10px] items-center p-[20px] relative shrink-0 w-full" data-name="Container">
      <Container16 />
      <Container17 />
    </div>
  );
}

function Text9() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-80 relative shrink-0 w-[16px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] text-center whitespace-nowrap">⊞</p>
    </div>
  );
}

function Text10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] whitespace-nowrap">Dashboard</p>
    </div>
  );
}

function Button3() {
  return (
    <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[10px] relative shrink-0 w-[224px]" data-name="Button">
      <Text9 />
      <Text10 />
    </div>
  );
}

function Text11() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-80 relative shrink-0 w-[16px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] text-center whitespace-nowrap">◉</p>
    </div>
  );
}

function Text12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] whitespace-nowrap">Customers</p>
    </div>
  );
}

function Button4() {
  return (
    <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[10px] relative shrink-0 w-[224px]" data-name="Button">
      <Text11 />
      <Text12 />
    </div>
  );
}

function Text13() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-80 relative shrink-0 w-[16px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] text-center whitespace-nowrap">◈</p>
    </div>
  );
}

function Text14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] whitespace-nowrap">Vehicles</p>
    </div>
  );
}

function Button5() {
  return (
    <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[10px] relative shrink-0 w-[224px]" data-name="Button">
      <Text13 />
      <Text14 />
    </div>
  );
}

function Text15() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-80 relative shrink-0 w-[16px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] text-center whitespace-nowrap">◫</p>
    </div>
  );
}

function Text16() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] whitespace-nowrap">Job Orders</p>
    </div>
  );
}

function Button6() {
  return (
    <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[10px] relative shrink-0 w-[224px]" data-name="Button">
      <Text15 />
      <Text16 />
    </div>
  );
}

function Text17() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-80 relative shrink-0 w-[16px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] text-center whitespace-nowrap">↻</p>
    </div>
  );
}

function Text18() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] whitespace-nowrap">Service History</p>
    </div>
  );
}

function Button7() {
  return (
    <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[10px] relative shrink-0 w-[224px]" data-name="Button">
      <Text17 />
      <Text18 />
    </div>
  );
}

function Navigation() {
  return (
    <div className="content-stretch flex flex-[515.413_0_0] flex-col items-start min-h-px overflow-clip py-[16px] relative w-full" data-name="Navigation">
      <Button3 />
      <Button4 />
      <Button5 />
      <Button6 />
      <Button7 />
    </div>
  );
}

function Container20() {
  return (
    <div className="bg-[rgba(255,255,255,0.15)] content-stretch flex items-center justify-center relative rounded-[26843500px] shrink-0 size-[28px]" data-name="Container">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap">KS</p>
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="content-stretch flex flex-col h-[15.988px] items-start overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.8)] whitespace-nowrap">Karim Samir</p>
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[10px] text-[rgba(255,255,255,0.35)] tracking-[0.5px] uppercase whitespace-nowrap">Engineer</p>
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-[146_0_0] flex-col items-start min-w-px relative" data-name="Container">
      <Paragraph11 />
      <Paragraph12 />
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-[184px]" data-name="Container">
      <Container20 />
      <Container21 />
    </div>
  );
}

function ContainerMargin2() {
  return (
    <div className="content-stretch flex flex-col items-center pb-[12px] relative shrink-0 w-full" data-name="Container:margin">
      <Container19 />
    </div>
  );
}

function Button8() {
  return (
    <div className="absolute h-[15.988px] left-0 top-[5.6px] w-[184px]" data-name="Button">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[12px] text-[rgba(255,255,255,0.35)] top-0 whitespace-nowrap">→ Sign out</p>
    </div>
  );
}

function Container22() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <Button8 />
    </div>
  );
}

function Container18() {
  return (
    <div className="border-[rgba(255,255,255,0.1)] border-solid border-t-[0.8px] content-stretch flex flex-col items-start px-[20px] py-[16px] relative shrink-0 w-full" data-name="Container">
      <ContainerMargin2 />
      <Container22 />
    </div>
  );
}

function Sidebar() {
  return (
    <div className="absolute bg-[#060f1e] content-stretch flex flex-col h-[688px] items-start left-0 top-0 w-[224px]" data-name="Sidebar">
      <Container15 />
      <Navigation />
      <Container18 />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col h-[20px] items-start pr-[16px] relative shrink-0 w-[117px]" data-name="Heading 1">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] whitespace-nowrap">Vehicle Details</p>
    </div>
  );
}

function TextInput() {
  return (
    <div className="absolute bg-[#f9fafb] border-[#e5e7eb] border-[0.8px] border-solid content-stretch flex flex-col h-[33.6px] items-start justify-center left-0 overflow-clip pl-[32px] pr-[16px] py-[6px] rounded-[10px] top-0 w-[448px]" data-name="Text Input">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#99a1af] text-[14px] w-full">Search vehicle, customer, job order…</p>
    </div>
  );
}

function Container23() {
  return (
    <div className="flex-[448_0_0] h-[33.6px] max-w-[448px] min-w-px relative" data-name="Container">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[12.24px] not-italic text-[#99a1af] text-[12px] top-[8.8px] whitespace-nowrap">🔍</p>
      <TextInput />
    </div>
  );
}

function Text19() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#6a7282] text-[14px] text-center whitespace-nowrap">🔔</p>
    </div>
  );
}

function Text20() {
  return <div className="absolute bg-[#fb2c36] border-[0.8px] border-solid border-white left-[20px] rounded-[26843500px] size-[8px] top-[4px]" data-name="Text" />;
}

function Button9() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[26843500px] shrink-0 size-[32px]" data-name="Button">
      <Text19 />
      <Text20 />
    </div>
  );
}

function Paragraph13() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[15px] not-italic relative shrink-0 text-[#101828] text-[12px] text-right whitespace-nowrap">Karim Samir</p>
    </div>
  );
}

function Paragraph14() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] capitalize font-['Inter:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[#99a1af] text-[10px] text-right whitespace-nowrap">engineer</p>
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[69.575px]" data-name="Container">
      <Paragraph13 />
      <Paragraph14 />
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Container">
      <Button9 />
      <Container25 />
    </div>
  );
}

function ContainerAlign() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start justify-end min-w-px relative" data-name="Container:align">
      <Container24 />
    </div>
  );
}

function Header() {
  return (
    <div className="absolute bg-white border-[#e5e7eb] border-b-[0.8px] border-solid content-stretch flex gap-[16px] h-[56px] items-center left-[224px] px-[24px] top-0 w-[970.4px]" data-name="Header">
      <Heading />
      <Container23 />
      <ContainerAlign />
    </div>
  );
}

function Container26() {
  return <div className="absolute backdrop-blur-[8px] bg-[rgba(0,0,0,0.4)] h-[688px] left-0 top-0 w-[1194.4px]" data-name="Container" />;
}

function Heading3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 3">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] whitespace-nowrap">Change Vehicle Owner</p>
    </div>
  );
}

function Button10() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#99a1af] text-[18px] text-center whitespace-nowrap">×</p>
    </div>
  );
}

function Container28() {
  return (
    <div className="border-[#f3f4f6] border-b-[0.8px] border-solid content-stretch flex items-center justify-between px-[24px] py-[16px] relative shrink-0 w-full" data-name="Container">
      <Heading3 />
      <Button10 />
    </div>
  );
}

function Container29() {
  return (
    <div className="bg-[#fffbeb] border-[#fee685] border-[0.8px] border-solid content-stretch flex flex-col items-start p-[12px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#973c00] text-[12px] w-[375px]">Changing the owner will update the current vehicle owner. Previous service history will remain linked to this vehicle.</p>
    </div>
  );
}

function Paragraph15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] tracking-[0.3px] uppercase whitespace-nowrap">Current Owner</p>
    </div>
  );
}

function Paragraph16() {
  return (
    <div className="content-stretch flex flex-col h-[28px] items-start pt-[4px] relative shrink-0 w-[400px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[#101828] text-[16px] whitespace-nowrap">Ahmed Mohamed</p>
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex flex-col h-[60px] items-start pt-[16px] relative shrink-0 w-[400px]" data-name="Container">
      <Paragraph15 />
      <Paragraph16 />
    </div>
  );
}

function Label() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px] tracking-[0.3px] uppercase whitespace-nowrap">New Customer</p>
    </div>
  );
}

function TextInput1() {
  return (
    <div className="absolute bg-white border-[#d1d5dc] border-[0.8px] border-solid content-stretch flex flex-col h-[37.6px] items-start justify-center left-0 overflow-clip pl-[36px] pr-[16px] py-[8px] rounded-[6px] top-0 w-[400px]" data-name="Text Input">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#99a1af] text-[14px] w-full">New Name</p>
    </div>
  );
}

function SearchInput() {
  return (
    <div className="h-[37.6px] relative shrink-0 w-full" data-name="SearchInput">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[12.11px] not-italic text-[#99a1af] text-[14px] top-[8.8px] whitespace-nowrap">🔍</p>
      <TextInput1 />
    </div>
  );
}

function SearchInputMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0 w-full" data-name="SearchInput:margin">
      <SearchInput />
    </div>
  );
}

function TextInput2() {
  return (
    <div className="absolute bg-white border-[#d1d5dc] border-[0.8px] border-solid content-stretch flex flex-col h-[37.6px] items-start justify-center left-0 overflow-clip pl-[36px] pr-[16px] py-[8px] rounded-[6px] top-0 w-[400px]" data-name="Text Input">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#99a1af] text-[14px] w-full">New Phone Number</p>
    </div>
  );
}

function SearchInput1() {
  return (
    <div className="h-[37.6px] relative shrink-0 w-full" data-name="SearchInput">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[12.11px] not-italic text-[#99a1af] text-[14px] top-[8.8px] whitespace-nowrap">🔍</p>
      <TextInput2 />
    </div>
  );
}

function SearchInputMargin1() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0 w-full" data-name="SearchInput:margin">
      <SearchInput1 />
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[16px] relative shrink-0 w-[400px]" data-name="Container">
      <Label />
      <SearchInputMargin />
      <SearchInputMargin1 />
    </div>
  );
}

function Button11() {
  return (
    <div className="bg-[#0f2340] content-stretch flex flex-[307.925_0_0] h-full items-center justify-center min-w-px px-[16px] py-[8px] relative rounded-[4px]" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap">Save Changes</p>
    </div>
  );
}

function Button12() {
  return (
    <div className="bg-white border-[#d1d5dc] border-[0.8px] border-solid content-stretch flex h-full items-center justify-center px-[16px] py-[8px] relative rounded-[4px] shrink-0" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#364153] text-[14px] text-center whitespace-nowrap">Cancel</p>
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex gap-[12px] h-[61.6px] items-start pt-[24px] relative shrink-0 w-full" data-name="Container">
      <Button11 />
      <Button12 />
    </div>
  );
}

function VehicleDetail7() {
  return (
    <div className="content-stretch flex flex-col items-start px-[24px] py-[20px] relative shrink-0 w-[448px]" data-name="VehicleDetail">
      <Container29 />
      <Container30 />
      <Container31 />
      <Container32 />
    </div>
  );
}

function Container27() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[388px] items-start left-[373px] max-h-[619.2000122070312px] max-w-[448px] overflow-clip rounded-[12px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] top-[87px] w-[448px]" data-name="Container">
      <Container28 />
      <VehicleDetail7 />
    </div>
  );
}

export default function CreateAppDesign() {
  return (
    <div className="bg-[#f3f4f6] content-stretch flex flex-col items-start relative size-full" data-name="Create app design">
      <App />
      <Sidebar />
      <Header />
      <Container26 />
      <Container27 />
    </div>
  );
}