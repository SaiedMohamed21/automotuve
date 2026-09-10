function Button() {
  return (
    <div className="content-stretch flex items-center justify-center px-[12px] py-[6px] relative rounded-[4px] shrink-0" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px] text-center whitespace-nowrap">← Back</p>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Container">
      <Button />
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col h-[52px] items-start pt-[24px] relative shrink-0 w-[922.4px]" data-name="Heading 2">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] not-italic relative shrink-0 text-[#101828] text-[20px] whitespace-nowrap">Engine Oil 5W-30 4L</p>
    </div>
  );
}

function PartDetail() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="PartDetail">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[#99a1af] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap">Part Details</p>
    </div>
  );
}

function Text() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#6a7282] text-[14px] whitespace-nowrap">Part Number</p>
    </div>
  );
}

function Text1() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#101828] text-[14px] whitespace-nowrap">OIL-5W30-4L</p>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex h-[20px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Text />
      <Text1 />
    </div>
  );
}

function Text2() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#6a7282] text-[14px] whitespace-nowrap">OEM</p>
    </div>
  );
}

function Text3() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#364153] text-[14px] whitespace-nowrap">MOBIL-1-5W30</p>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex h-[28px] items-start justify-between pt-[8px] relative shrink-0 w-[411.6px]" data-name="Container">
      <Text2 />
      <Text3 />
    </div>
  );
}

function Text4() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#6a7282] text-[14px] whitespace-nowrap">Brand</p>
    </div>
  );
}

function Text5() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] whitespace-nowrap">Mobil 1</p>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex h-[28px] items-start justify-between pt-[8px] relative shrink-0 w-[411.6px]" data-name="Container">
      <Text4 />
      <Text5 />
    </div>
  );
}

function Text6() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#6a7282] text-[14px] whitespace-nowrap">Category</p>
    </div>
  );
}

function Text7() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] whitespace-nowrap">Lubricants</p>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex h-[28px] items-start justify-between pt-[8px] relative shrink-0 w-[411.6px]" data-name="Container">
      <Text6 />
      <Text7 />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#6a7282] text-[14px] whitespace-nowrap">Compatible Vehicles</p>
    </div>
  );
}

function Text8() {
  return (
    <div className="bg-[#f3f4f6] content-stretch flex flex-col items-start px-[8px] py-[2px] relative rounded-[4px] shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px] whitespace-nowrap">Universal</p>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex h-[24px] items-start pt-[4px] relative shrink-0 w-[411.6px]" data-name="Container">
      <Text8 />
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col h-[52px] items-start pt-[8px] relative shrink-0 w-[411.6px]" data-name="Container">
      <Paragraph />
      <Container7 />
    </div>
  );
}

function PartDetail1() {
  return (
    <div className="content-stretch flex flex-col h-[168px] items-start pt-[12px] relative shrink-0 w-[411.6px]" data-name="PartDetail">
      <Container2 />
      <Container3 />
      <Container4 />
      <Container5 />
      <Container6 />
    </div>
  );
}

function Card() {
  return (
    <div className="bg-white border-[#e5e7eb] border-[0.8px] border-solid col-1 content-stretch flex flex-col items-start justify-self-stretch p-[20px] relative rounded-[10px] row-1 self-stretch shrink-0" data-name="Card">
      <PartDetail />
      <PartDetail1 />
    </div>
  );
}

function PartDetail2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="PartDetail">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[#99a1af] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap">Stock Info</p>
    </div>
  );
}

function Text9() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#6a7282] text-[14px] whitespace-nowrap">Current Qty</p>
    </div>
  );
}

function Text10() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[#101828] text-[16px] whitespace-nowrap">42</p>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex h-[24px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Text9 />
      <Text10 />
    </div>
  );
}

function Text11() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#6a7282] text-[14px] whitespace-nowrap">Min Qty</p>
    </div>
  );
}

function Text12() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#364153] text-[14px] whitespace-nowrap">20</p>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex h-[28px] items-start justify-between pt-[8px] relative shrink-0 w-[411.6px]" data-name="Container">
      <Text11 />
      <Text12 />
    </div>
  );
}

function Text13() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#6a7282] text-[14px] whitespace-nowrap">Location</p>
    </div>
  );
}

function Text14() {
  return (
    <div className="bg-[#f3f4f6] content-stretch flex flex-col h-full items-start px-[8px] py-[2px] relative rounded-[4px] shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#101828] text-[14px] whitespace-nowrap">B-01</p>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex h-[32px] items-start justify-between pt-[8px] relative shrink-0 w-[411.6px]" data-name="Container">
      <Text13 />
      <Text14 />
    </div>
  );
}

function Text15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#6a7282] text-[14px] whitespace-nowrap">Status</p>
    </div>
  );
}

function Text16() {
  return (
    <div className="bg-[#f0fdf4] border-[#b9f8cf] border-[0.8px] border-solid content-stretch flex items-start px-[8px] py-[2px] relative rounded-[4px] shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#008236] text-[12px] whitespace-nowrap">In Stock</p>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex h-[29.6px] items-center justify-between pt-[8px] relative shrink-0 w-[411.6px]" data-name="Container">
      <Text15 />
      <Text16 />
    </div>
  );
}

function PartDetail3() {
  return (
    <div className="content-stretch flex flex-col h-[125.6px] items-start pt-[12px] relative shrink-0 w-[411.6px]" data-name="PartDetail">
      <Container8 />
      <Container9 />
      <Container10 />
      <Container11 />
    </div>
  );
}

function Card1() {
  return (
    <div className="bg-white border-[#e5e7eb] border-[0.8px] border-solid col-2 content-stretch flex flex-col items-start justify-self-stretch p-[20px] relative rounded-[10px] row-1 self-stretch shrink-0" data-name="Card">
      <PartDetail2 />
      <PartDetail3 />
    </div>
  );
}

function Container1() {
  return (
    <div className="gap-x-[16px] gap-y-[16px] grid grid-cols-[__453.20px_453.20px] grid-rows-[_225.57px] relative shrink-0 w-full" data-name="Container">
      <Card />
      <Card1 />
    </div>
  );
}

function ContainerMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[24px] relative shrink-0 w-full" data-name="Container:margin">
      <Container1 />
    </div>
  );
}

function CardMargin() {
  return <div className="content-stretch flex flex-col h-[149.587px] items-start pt-[24px] relative shrink-0 w-full" data-name="Card:margin" />;
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 2">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[#1e2939] text-[14px] tracking-[0.7px] uppercase whitespace-nowrap">Stock Movements</p>
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
    <div className="absolute bg-[#f9fafb] border-[#f3f4f6] border-b-[0.8px] border-solid h-[36.388px] left-0 top-0 w-[145.875px]" data-name="Header Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] left-[16px] not-italic text-[#6a7282] text-[12px] top-[10px] tracking-[0.6px] uppercase whitespace-nowrap">Type</p>
    </div>
  );
}

function HeaderCell1() {
  return (
    <div className="absolute bg-[#f9fafb] border-[#f3f4f6] border-b-[0.8px] border-solid h-[36.388px] left-[145.88px] top-0 w-[197.963px]" data-name="Header Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] left-[16px] not-italic text-[#6a7282] text-[12px] top-[10px] tracking-[0.6px] uppercase whitespace-nowrap">Reference</p>
    </div>
  );
}

function HeaderCell2() {
  return (
    <div className="absolute bg-[#f9fafb] border-[#f3f4f6] border-b-[0.8px] border-solid h-[36.388px] left-[343.84px] top-0 w-[301.8px]" data-name="Header Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] left-[16px] not-italic text-[#6a7282] text-[12px] top-[10px] tracking-[0.6px] uppercase whitespace-nowrap">Note</p>
    </div>
  );
}

function HeaderCell3() {
  return (
    <div className="absolute bg-[#f9fafb] border-[#f3f4f6] border-b-[0.8px] border-solid h-[36.388px] left-[645.64px] top-0 w-[181.613px]" data-name="Header Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] left-[16px] not-italic text-[#6a7282] text-[12px] top-[10px] tracking-[0.6px] uppercase whitespace-nowrap">Date</p>
    </div>
  );
}

function HeaderCell4() {
  return (
    <div className="absolute bg-[#f9fafb] border-[#f3f4f6] border-b-[0.8px] border-solid h-[36.388px] left-[827.25px] top-0 w-[93.55px]" data-name="Header Cell">
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] left-[78.21px] not-italic text-[#6a7282] text-[12px] text-right top-[10px] tracking-[0.6px] uppercase whitespace-nowrap">Qty</p>
    </div>
  );
}

function Text17() {
  return (
    <div className="absolute bg-[#fef2f2] content-stretch flex items-start left-[16px] px-[8px] py-[2px] rounded-[4px] top-[13.6px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[#c10007] text-[12px] whitespace-nowrap">↑ Issue</p>
    </div>
  );
}

function TableCell() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[45.987px] left-0 top-[36.39px] w-[145.875px]" data-name="Table Cell">
      <Text17 />
    </div>
  );
}

function TableCell1() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[45.987px] left-[145.88px] top-[36.39px] w-[197.963px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#364153] text-[12px] top-[15px] whitespace-nowrap">JO-2026-00125</p>
    </div>
  );
}

function TableCell2() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[45.987px] left-[343.84px] top-[36.39px] w-[301.8px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[#364153] text-[14px] top-[13.59px] whitespace-nowrap">Engine oil for BMW 320i</p>
    </div>
  );
}

function TableCell3() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[45.987px] left-[645.64px] top-[36.39px] w-[181.613px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[#364153] text-[14px] top-[13.59px] whitespace-nowrap">12 Aug 2026</p>
    </div>
  );
}

function TableCell4() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[45.987px] left-[827.25px] top-[36.39px] w-[93.55px]" data-name="Table Cell">
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-[78.47px] not-italic text-[#e7000b] text-[14px] text-right top-[13.59px] whitespace-nowrap">-2</p>
    </div>
  );
}

function Table() {
  return (
    <div className="h-[82.775px] overflow-clip relative shrink-0 w-full" data-name="Table">
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

function Card2() {
  return (
    <div className="bg-white border-[#e5e7eb] border-[0.8px] border-solid content-stretch flex flex-col items-start relative rounded-[10px] shrink-0 w-full" data-name="Card">
      <Table />
    </div>
  );
}

function CardMargin1() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[16px] relative shrink-0 w-full" data-name="Card:margin">
      <Card2 />
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col h-[144.375px] items-start pt-[24px] relative shrink-0 w-[922.4px]" data-name="Container">
      <SectionHeader />
      <CardMargin1 />
    </div>
  );
}

function App() {
  return (
    <div className="bg-[#f3f4f6] content-stretch flex flex-col h-[727.537px] items-start min-h-[688px] pb-[24px] pl-[248px] pr-[24px] pt-[80px] relative shrink-0 w-full" data-name="App">
      <Container />
      <Heading1 />
      <ContainerMargin />
      <CardMargin />
      <Container12 />
    </div>
  );
}

function Body() {
  return (
    <div className="content-stretch flex flex-col h-[688px] items-start relative shrink-0 w-[1194.4px]" data-name="Body">
      <App />
    </div>
  );
}

function Container14() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[28px]" data-name="Container">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Bold',sans-serif] font-bold leading-[16px] relative shrink-0 text-[12px] text-[rgba(255,255,255,0.9)] whitespace-nowrap">SA</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="content-stretch flex flex-col h-[15px] items-start overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15px] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap">Star Auto Center</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="content-stretch flex flex-col h-[17px] items-start pt-[2px] relative shrink-0 w-[96.563px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[10px] text-[rgba(255,255,255,0.4)] tracking-[0.5px] uppercase whitespace-nowrap">Warehouse</p>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[96.563px]" data-name="Container">
      <Paragraph1 />
      <Paragraph2 />
    </div>
  );
}

function Container13() {
  return (
    <div className="border-[rgba(255,255,255,0.1)] border-b-[0.8px] border-solid content-stretch flex gap-[10px] items-center p-[20px] relative shrink-0 w-full" data-name="Container">
      <Container14 />
      <Container15 />
    </div>
  );
}

function Text18() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-80 relative shrink-0 w-[16px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] text-center whitespace-nowrap">⊞</p>
    </div>
  );
}

function Text19() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] whitespace-nowrap">Dashboard</p>
    </div>
  );
}

function Button1() {
  return (
    <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[10px] relative shrink-0 w-[224px]" data-name="Button">
      <Text18 />
      <Text19 />
    </div>
  );
}

function Text20() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-80 relative shrink-0 w-[16px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] text-center whitespace-nowrap">◫</p>
    </div>
  );
}

function Text21() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] whitespace-nowrap">Open Job Orders</p>
    </div>
  );
}

function Button2() {
  return (
    <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[10px] relative shrink-0 w-[224px]" data-name="Button">
      <Text20 />
      <Text21 />
    </div>
  );
}

function Text22() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-80 relative shrink-0 w-[16px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] text-center whitespace-nowrap">▤</p>
    </div>
  );
}

function Text23() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] whitespace-nowrap">Parts</p>
    </div>
  );
}

function Button3() {
  return (
    <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[10px] relative shrink-0 w-[224px]" data-name="Button">
      <Text22 />
      <Text23 />
    </div>
  );
}

function Text24() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-80 relative shrink-0 w-[16px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] text-center whitespace-nowrap">⊟</p>
    </div>
  );
}

function Text25() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Stock Update</p>
    </div>
  );
}

function Button4() {
  return (
    <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[10px] relative shrink-0 w-[224px]" data-name="Button">
      <Text24 />
      <Text25 />
    </div>
  );
}

function Text26() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-80 relative shrink-0 w-[16px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] text-center whitespace-nowrap">↕</p>
    </div>
  );
}

function Text27() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] whitespace-nowrap">Movements</p>
    </div>
  );
}

function Button5() {
  return (
    <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[10px] relative shrink-0 w-[224px]" data-name="Button">
      <Text26 />
      <Text27 />
    </div>
  );
}

function Navigation() {
  return (
    <div className="content-stretch flex flex-[515.413_0_0] flex-col items-start min-h-px overflow-clip py-[16px] relative w-full" data-name="Navigation">
      <Button1 />
      <Button2 />
      <Button3 />
      <Button4 />
      <Button5 />
    </div>
  );
}

function Container18() {
  return (
    <div className="bg-[rgba(255,255,255,0.15)] content-stretch flex items-center justify-center relative rounded-[26843500px] shrink-0 size-[28px]" data-name="Container">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap">HN</p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="content-stretch flex flex-col h-[15.988px] items-start overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.8)] whitespace-nowrap">Hassan Nour</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[10px] text-[rgba(255,255,255,0.35)] tracking-[0.5px] uppercase whitespace-nowrap">Warehouse</p>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-[146_0_0] flex-col items-start min-w-px relative" data-name="Container">
      <Paragraph3 />
      <Paragraph4 />
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-[184px]" data-name="Container">
      <Container18 />
      <Container19 />
    </div>
  );
}

function ContainerMargin1() {
  return (
    <div className="content-stretch flex flex-col items-center pb-[12px] relative shrink-0 w-full" data-name="Container:margin">
      <Container17 />
    </div>
  );
}

function Button6() {
  return (
    <div className="absolute h-[15.988px] left-0 top-[5.6px] w-[184px]" data-name="Button">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[12px] text-[rgba(255,255,255,0.35)] top-0 whitespace-nowrap">→ Sign out</p>
    </div>
  );
}

function Container20() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <Button6 />
    </div>
  );
}

function Container16() {
  return (
    <div className="border-[rgba(255,255,255,0.1)] border-solid border-t-[0.8px] content-stretch flex flex-col items-start px-[20px] py-[16px] relative shrink-0 w-full" data-name="Container">
      <ContainerMargin1 />
      <Container20 />
    </div>
  );
}

function Sidebar() {
  return (
    <div className="absolute bg-[#060f1e] content-stretch flex flex-col h-[728px] items-start left-0 top-0 w-[224px]" data-name="Sidebar">
      <Container13 />
      <Navigation />
      <Container16 />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col h-[20px] items-start pr-[16px] relative shrink-0 w-[95px]" data-name="Heading 1">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] whitespace-nowrap">Part Details</p>
    </div>
  );
}

function Text28() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#6a7282] text-[14px] text-center whitespace-nowrap">🔔</p>
    </div>
  );
}

function Text29() {
  return <div className="absolute bg-[#fb2c36] border-[0.8px] border-solid border-white left-[20px] rounded-[26843500px] size-[8px] top-[4px]" data-name="Text" />;
}

function Button7() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[26843500px] shrink-0 size-[32px]" data-name="Button">
      <Text28 />
      <Text29 />
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[15px] not-italic relative shrink-0 text-[#101828] text-[12px] text-right whitespace-nowrap">Hassan Nour</p>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] capitalize font-['Inter:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[#99a1af] text-[10px] text-right whitespace-nowrap">warehouse</p>
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[74.1px]" data-name="Container">
      <Paragraph5 />
      <Paragraph6 />
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Container">
      <Button7 />
      <Container22 />
    </div>
  );
}

function ContainerAlign() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start justify-end min-w-px relative" data-name="Container:align">
      <Container21 />
    </div>
  );
}

function Header() {
  return (
    <div className="absolute bg-white border-[#e5e7eb] border-b-[0.8px] border-solid content-stretch flex gap-[16px] h-[56px] items-center left-[224px] px-[24px] top-0 w-[970.4px]" data-name="Header">
      <Heading />
      <ContainerAlign />
    </div>
  );
}

export default function CreateAppDesign() {
  return (
    <div className="bg-[#f3f4f6] content-stretch flex flex-col items-start relative size-full" data-name="Create app design">
      <Body />
      <Sidebar />
      <Header />
    </div>
  );
}