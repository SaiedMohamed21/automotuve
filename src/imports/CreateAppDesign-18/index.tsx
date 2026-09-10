function Button() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#99a1af] text-[14px] text-center whitespace-nowrap">← Back</p>
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[#101828] text-[16px] whitespace-nowrap">New Job Order</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#6a7282] text-[12px] whitespace-nowrap">JO-2026-00126 · 12 Aug 2026 · Karim Samir</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[295.2px]" data-name="Container">
      <Heading1 />
      <Paragraph />
    </div>
  );
}

function Container5() {
  return (
    <div className="bg-[#0f2340] content-stretch flex items-center justify-center relative rounded-[26843500px] shrink-0 size-[24px]" data-name="Container">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap">✓</p>
    </div>
  );
}

function Text() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px] whitespace-nowrap">Customer</p>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <Container5 />
      <Text />
    </div>
  );
}

function Container6() {
  return <div className="bg-[#0f2340] h-px relative shrink-0 w-[32px]" data-name="Container" />;
}

function ContainerMargin() {
  return (
    <div className="content-stretch flex items-start px-[12px] relative shrink-0" data-name="Container:margin">
      <Container6 />
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Container">
      <Container4 />
      <ContainerMargin />
    </div>
  );
}

function Container9() {
  return (
    <div className="bg-[#0f2340] content-stretch flex items-center justify-center overflow-clip relative rounded-[26843500px] shadow-[0px_0px_0px_2px_rgba(15,35,64,0.2)] shrink-0 size-[24px]" data-name="Container">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap">2</p>
    </div>
  );
}

function Text1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#0f2340] text-[12px] whitespace-nowrap">Vehicle</p>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <Container9 />
      <Text1 />
    </div>
  );
}

function Container10() {
  return <div className="bg-[#e5e7eb] h-px relative shrink-0 w-[32px]" data-name="Container" />;
}

function ContainerMargin1() {
  return (
    <div className="content-stretch flex items-start px-[12px] relative shrink-0" data-name="Container:margin">
      <Container10 />
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Container">
      <Container8 />
      <ContainerMargin1 />
    </div>
  );
}

function Container13() {
  return (
    <div className="bg-[#e5e7eb] content-stretch flex items-center justify-center relative rounded-[26843500px] shrink-0 size-[24px]" data-name="Container">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] whitespace-nowrap">3</p>
    </div>
  );
}

function Text2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#99a1af] text-[12px] whitespace-nowrap">Job Details</p>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <Container13 />
      <Text2 />
    </div>
  );
}

function Container14() {
  return <div className="bg-[#e5e7eb] h-px relative shrink-0 w-[32px]" data-name="Container" />;
}

function ContainerMargin2() {
  return (
    <div className="content-stretch flex items-start px-[12px] relative shrink-0" data-name="Container:margin">
      <Container14 />
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Container">
      <Container12 />
      <ContainerMargin2 />
    </div>
  );
}

function Container16() {
  return (
    <div className="bg-[#e5e7eb] content-stretch flex items-center justify-center relative rounded-[26843500px] shrink-0 size-[24px]" data-name="Container">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] whitespace-nowrap">4</p>
    </div>
  );
}

function Text3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#99a1af] text-[12px] whitespace-nowrap">{`Review & Print`}</p>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <Container16 />
      <Text3 />
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Container">
      <Container3 />
      <Container7 />
      <Container11 />
      <Container15 />
    </div>
  );
}

function ContainerAlign() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start justify-end min-w-px relative" data-name="Container:align">
      <Container2 />
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full" data-name="Container">
      <Button />
      <Container1 />
      <ContainerAlign />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="content-stretch flex flex-col h-[20px] items-start pb-[4px] relative shrink-0 w-[138.275px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[#254e87] text-[12px] tracking-[0.3px] uppercase whitespace-nowrap">Customer Selected</p>
    </div>
  );
}

function Button1() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#254e87] text-[12px] text-center whitespace-nowrap">Change</p>
    </div>
  );
}

function NewJobOrder1() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="NewJobOrder">
      <Paragraph1 />
      <Button1 />
    </div>
  );
}

function Card() {
  return (
    <div className="bg-white border-[#e5e7eb] border-[0.8px] border-solid content-stretch flex flex-col items-start p-[16px] relative rounded-[10px] shrink-0 w-full" data-name="Card">
      <NewJobOrder1 />
    </div>
  );
}

function NewJobOrder2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="NewJobOrder">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap">Select Vehicle</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap">Or search by plate / VIN</p>
    </div>
  );
}

function TextInput() {
  return (
    <div className="absolute bg-white border-[#d1d5dc] border-[0.8px] border-solid content-stretch flex flex-col h-[37.6px] items-start justify-center left-0 overflow-clip pl-[36px] pr-[16px] py-[8px] rounded-[6px] top-0 w-[565.325px]" data-name="Text Input">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#99a1af] text-[14px] w-full">Enter plate number or VIN…</p>
    </div>
  );
}

function SearchInput() {
  return (
    <div className="h-[37.6px] relative shrink-0 w-full" data-name="SearchInput">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[12.11px] not-italic text-[#99a1af] text-[14px] top-[8.8px] whitespace-nowrap">🔍</p>
      <TextInput />
    </div>
  );
}

function SearchInputMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[12px] relative shrink-0 w-full" data-name="SearchInput:margin">
      <SearchInput />
    </div>
  );
}

function NewJobOrder3() {
  return (
    <div className="border-[#f3f4f6] border-solid border-t-[0.8px] content-stretch flex flex-col items-start pt-[16px] relative shrink-0 w-full" data-name="NewJobOrder">
      <Paragraph2 />
      <SearchInputMargin />
    </div>
  );
}

function NewJobOrderMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[16px] relative shrink-0 w-full" data-name="NewJobOrder:margin">
      <NewJobOrder3 />
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute bg-white border-[#d1d5dc] border-[0.8px] border-solid content-stretch flex h-[37.6px] items-center justify-center left-0 px-[16px] py-[8px] rounded-[4px] top-[16px] w-[565.325px]" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#364153] text-[14px] text-center whitespace-nowrap">+ Add New Vehicle</p>
    </div>
  );
}

function Container19() {
  return (
    <div className="h-[53.6px] relative shrink-0 w-full" data-name="Container">
      <Button2 />
    </div>
  );
}

function Card1() {
  return (
    <div className="bg-white border-[#e5e7eb] border-[0.8px] border-solid content-stretch flex flex-col items-start p-[20px] relative rounded-[10px] shrink-0 w-full" data-name="Card">
      <NewJobOrder2 />
      <NewJobOrderMargin />
      <Container19 />
    </div>
  );
}

function CardMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[16px] relative shrink-0 w-full" data-name="Card:margin">
      <Card1 />
    </div>
  );
}

function Container18() {
  return (
    <div className="col-[1/span_2] content-stretch flex flex-col items-start justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <Card />
      <CardMargin />
    </div>
  );
}

function NewJobOrder4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="NewJobOrder">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap">Job Order Info</p>
    </div>
  );
}

function Container22() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#99a1af] text-[12px] top-[2.2px] whitespace-nowrap">Number</p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Bold',sans-serif] font-semibold leading-[20px] relative shrink-0 text-[#0f2340] text-[14px] whitespace-nowrap">JO-2026-00126</p>
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Container22 />
      <Paragraph3 />
    </div>
  );
}

function Container24() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#99a1af] text-[12px] top-[2.2px] whitespace-nowrap">Date</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#111827] text-[14px] whitespace-nowrap">12 Aug 2026</p>
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex flex-col h-[52px] items-start pt-[12px] relative shrink-0 w-[249.875px]" data-name="Container">
      <Container24 />
      <Paragraph4 />
    </div>
  );
}

function Container26() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#99a1af] text-[12px] top-[2.2px] whitespace-nowrap">Engineer</p>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#111827] text-[14px] whitespace-nowrap">Karim Samir</p>
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex flex-col h-[52px] items-start pt-[12px] relative shrink-0 w-[249.875px]" data-name="Container">
      <Container26 />
      <Paragraph5 />
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex flex-col h-[28px] items-start pt-[12px] relative shrink-0 w-[249.875px]" data-name="Container">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#99a1af] text-[12px] whitespace-nowrap">Customer</p>
    </div>
  );
}

function Container29() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#99a1af] text-[12px] top-[2.2px] whitespace-nowrap">Vehicle</p>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#99a1af] text-[14px] whitespace-nowrap">Selecting…</p>
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex flex-col h-[52px] items-start pt-[12px] relative shrink-0 w-[249.875px]" data-name="Container">
      <Container29 />
      <Paragraph6 />
    </div>
  );
}

function NewJobOrder5() {
  return (
    <div className="content-stretch flex flex-col h-[236px] items-start pt-[12px] relative shrink-0 w-[249.875px]" data-name="NewJobOrder">
      <Container21 />
      <Container23 />
      <Container25 />
      <Container27 />
      <Container28 />
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute h-[15.988px] left-0 top-[21.6px] w-[114.75px]" data-name="Button">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[57.5px] not-italic text-[#6a7282] text-[12px] text-center top-0 whitespace-nowrap">← Back to Customer</p>
    </div>
  );
}

function NewJobOrder6() {
  return (
    <div className="border-[#f3f4f6] border-solid border-t-[0.8px] h-[40.8px] relative shrink-0 w-full" data-name="NewJobOrder">
      <Button3 />
    </div>
  );
}

function NewJobOrderMargin1() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[16px] relative shrink-0 w-full" data-name="NewJobOrder:margin">
      <NewJobOrder6 />
    </div>
  );
}

function Card2() {
  return (
    <div className="bg-white border-[#e5e7eb] border-[0.8px] border-dashed content-stretch flex flex-col items-start p-[20px] relative rounded-[10px] shrink-0 w-full" data-name="Card">
      <NewJobOrder4 />
      <NewJobOrder5 />
      <NewJobOrderMargin1 />
    </div>
  );
}

function Container20() {
  return (
    <div className="col-3 content-stretch flex flex-col items-start justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <Card2 />
    </div>
  );
}

function Container17() {
  return (
    <div className="gap-x-[24px] gap-y-[24px] grid grid-cols-[___291.46px_291.46px_291.48px] grid-rows-[_354.39px] relative shrink-0 w-full" data-name="Container">
      <Container18 />
      <Container20 />
    </div>
  );
}

function ContainerMargin3() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[24px] relative shrink-0 w-full" data-name="Container:margin">
      <Container17 />
    </div>
  );
}

function NewJobOrder() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[1024px] p-[24px] relative shrink-0 w-[970.4px]" data-name="NewJobOrder">
      <Container />
      <ContainerMargin3 />
    </div>
  );
}

function App() {
  return (
    <div className="bg-[#f3f4f6] content-stretch flex flex-col h-[688px] items-start pl-[224px] pt-[56px] relative shrink-0 w-[1194.4px]" data-name="App">
      <NewJobOrder />
    </div>
  );
}

function Container31() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[28px]" data-name="Container">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Bold',sans-serif] font-bold leading-[16px] relative shrink-0 text-[12px] text-[rgba(255,255,255,0.9)] whitespace-nowrap">SA</p>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="content-stretch flex flex-col h-[15px] items-start overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15px] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap">Star Auto Center</p>
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="content-stretch flex flex-col h-[17px] items-start pt-[2px] relative shrink-0 w-[96.563px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[10px] text-[rgba(255,255,255,0.4)] tracking-[0.5px] uppercase whitespace-nowrap">Engineer</p>
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[96.563px]" data-name="Container">
      <Paragraph7 />
      <Paragraph8 />
    </div>
  );
}

function Container30() {
  return (
    <div className="border-[rgba(255,255,255,0.1)] border-b-[0.8px] border-solid content-stretch flex gap-[10px] items-center p-[20px] relative shrink-0 w-full" data-name="Container">
      <Container31 />
      <Container32 />
    </div>
  );
}

function Text4() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-80 relative shrink-0 w-[16px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] text-center whitespace-nowrap">⊞</p>
    </div>
  );
}

function Text5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] whitespace-nowrap">Dashboard</p>
    </div>
  );
}

function Button4() {
  return (
    <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[10px] relative shrink-0 w-[224px]" data-name="Button">
      <Text4 />
      <Text5 />
    </div>
  );
}

function Text6() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-80 relative shrink-0 w-[16px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] text-center whitespace-nowrap">◉</p>
    </div>
  );
}

function Text7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] whitespace-nowrap">Customers</p>
    </div>
  );
}

function Button5() {
  return (
    <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[10px] relative shrink-0 w-[224px]" data-name="Button">
      <Text6 />
      <Text7 />
    </div>
  );
}

function Text8() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-80 relative shrink-0 w-[16px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] text-center whitespace-nowrap">◈</p>
    </div>
  );
}

function Text9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] whitespace-nowrap">Vehicles</p>
    </div>
  );
}

function Button6() {
  return (
    <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[10px] relative shrink-0 w-[224px]" data-name="Button">
      <Text8 />
      <Text9 />
    </div>
  );
}

function Text10() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-80 relative shrink-0 w-[16px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] text-center whitespace-nowrap">◫</p>
    </div>
  );
}

function Text11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] whitespace-nowrap">Job Orders</p>
    </div>
  );
}

function Button7() {
  return (
    <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[10px] relative shrink-0 w-[224px]" data-name="Button">
      <Text10 />
      <Text11 />
    </div>
  );
}

function Text12() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-80 relative shrink-0 w-[16px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] text-center whitespace-nowrap">↻</p>
    </div>
  );
}

function Text13() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] whitespace-nowrap">Service History</p>
    </div>
  );
}

function Button8() {
  return (
    <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[10px] relative shrink-0 w-[224px]" data-name="Button">
      <Text12 />
      <Text13 />
    </div>
  );
}

function Navigation() {
  return (
    <div className="content-stretch flex flex-[515.413_0_0] flex-col items-start min-h-px overflow-clip py-[16px] relative w-full" data-name="Navigation">
      <Button4 />
      <Button5 />
      <Button6 />
      <Button7 />
      <Button8 />
    </div>
  );
}

function Container35() {
  return (
    <div className="bg-[rgba(255,255,255,0.15)] content-stretch flex items-center justify-center relative rounded-[26843500px] shrink-0 size-[28px]" data-name="Container">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap">KS</p>
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="content-stretch flex flex-col h-[15.988px] items-start overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.8)] whitespace-nowrap">Karim Samir</p>
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[10px] text-[rgba(255,255,255,0.35)] tracking-[0.5px] uppercase whitespace-nowrap">Engineer</p>
    </div>
  );
}

function Container36() {
  return (
    <div className="content-stretch flex flex-[146_0_0] flex-col items-start min-w-px relative" data-name="Container">
      <Paragraph9 />
      <Paragraph10 />
    </div>
  );
}

function Container34() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-[184px]" data-name="Container">
      <Container35 />
      <Container36 />
    </div>
  );
}

function ContainerMargin4() {
  return (
    <div className="content-stretch flex flex-col items-center pb-[12px] relative shrink-0 w-full" data-name="Container:margin">
      <Container34 />
    </div>
  );
}

function Button9() {
  return (
    <div className="absolute h-[15.988px] left-0 top-[5.6px] w-[184px]" data-name="Button">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[12px] text-[rgba(255,255,255,0.35)] top-0 whitespace-nowrap">→ Sign out</p>
    </div>
  );
}

function Container37() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <Button9 />
    </div>
  );
}

function Container33() {
  return (
    <div className="border-[rgba(255,255,255,0.1)] border-solid border-t-[0.8px] content-stretch flex flex-col items-start px-[20px] py-[16px] relative shrink-0 w-full" data-name="Container">
      <ContainerMargin4 />
      <Container37 />
    </div>
  );
}

function Sidebar() {
  return (
    <div className="absolute bg-[#060f1e] content-stretch flex flex-col h-[688px] items-start left-0 top-0 w-[224px]" data-name="Sidebar">
      <Container30 />
      <Navigation />
      <Container33 />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col h-[20px] items-start pr-[16px] relative shrink-0 w-[118px]" data-name="Heading 1">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] whitespace-nowrap">New Job Order</p>
    </div>
  );
}

function TextInput1() {
  return (
    <div className="absolute bg-[#f9fafb] border-[#e5e7eb] border-[0.8px] border-solid content-stretch flex flex-col h-[33.6px] items-start justify-center left-0 overflow-clip pl-[32px] pr-[16px] py-[6px] rounded-[10px] top-0 w-[448px]" data-name="Text Input">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#111827] text-[14px] w-full">abc</p>
    </div>
  );
}

function Container38() {
  return (
    <div className="flex-[448_0_0] h-[33.6px] max-w-[448px] min-w-px relative" data-name="Container">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[12.24px] not-italic text-[#99a1af] text-[12px] top-[8.8px] whitespace-nowrap">🔍</p>
      <TextInput1 />
    </div>
  );
}

function Text14() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#6a7282] text-[14px] text-center whitespace-nowrap">🔔</p>
    </div>
  );
}

function Text15() {
  return <div className="absolute bg-[#fb2c36] border-[0.8px] border-solid border-white left-[20px] rounded-[26843500px] size-[8px] top-[4px]" data-name="Text" />;
}

function Button10() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[26843500px] shrink-0 size-[32px]" data-name="Button">
      <Text14 />
      <Text15 />
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[15px] not-italic relative shrink-0 text-[#101828] text-[12px] text-right whitespace-nowrap">Karim Samir</p>
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] capitalize font-['Inter:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[#99a1af] text-[10px] text-right whitespace-nowrap">engineer</p>
    </div>
  );
}

function Container40() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[69.575px]" data-name="Container">
      <Paragraph11 />
      <Paragraph12 />
    </div>
  );
}

function Container39() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Container">
      <Button10 />
      <Container40 />
    </div>
  );
}

function ContainerAlign1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start justify-end min-w-px relative" data-name="Container:align">
      <Container39 />
    </div>
  );
}

function Header() {
  return (
    <div className="absolute bg-white border-[#e5e7eb] border-b-[0.8px] border-solid content-stretch flex gap-[16px] h-[56px] items-center left-[224px] px-[24px] top-0 w-[970.4px]" data-name="Header">
      <Heading />
      <Container38 />
      <ContainerAlign1 />
    </div>
  );
}

function Container41() {
  return <div className="absolute backdrop-blur-[8px] bg-[rgba(0,0,0,0.4)] h-[688px] left-0 top-0 w-[1194.4px]" data-name="Container" />;
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 3">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] whitespace-nowrap">Add New Vehicle</p>
    </div>
  );
}

function Button11() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#99a1af] text-[18px] text-center whitespace-nowrap">×</p>
    </div>
  );
}

function Container43() {
  return (
    <div className="border-[#f3f4f6] border-b-[0.8px] border-solid content-stretch flex items-center justify-between px-[24px] py-[16px] relative shrink-0 w-full" data-name="Container">
      <Heading2 />
      <Button11 />
    </div>
  );
}

function Label() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px] tracking-[0.3px] uppercase whitespace-nowrap">Make *</p>
    </div>
  );
}

function TextInput2() {
  return (
    <div className="bg-white border-[#d1d5dc] border-[0.8px] border-solid content-stretch flex flex-col h-[37.6px] items-start justify-center overflow-clip px-[12px] py-[8px] relative rounded-[6px] shrink-0 w-[256px]" data-name="Text Input">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#99a1af] text-[14px] w-full">BMW</p>
    </div>
  );
}

function Input() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[4px] items-start justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Input">
      <Label />
      <TextInput2 />
    </div>
  );
}

function Label1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px] tracking-[0.3px] uppercase whitespace-nowrap">Model *</p>
    </div>
  );
}

function TextInput3() {
  return (
    <div className="bg-white border-[#d1d5dc] border-[0.8px] border-solid content-stretch flex flex-col h-[37.6px] items-start justify-center overflow-clip px-[12px] py-[8px] relative rounded-[6px] shrink-0 w-[256px]" data-name="Text Input">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#99a1af] text-[14px] w-full">320i</p>
    </div>
  );
}

function Input1() {
  return (
    <div className="col-2 content-stretch flex flex-col gap-[4px] items-start justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Input">
      <Label1 />
      <TextInput3 />
    </div>
  );
}

function Label2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px] tracking-[0.3px] uppercase whitespace-nowrap">Year *</p>
    </div>
  );
}

function TextInput4() {
  return (
    <div className="bg-white border-[#d1d5dc] border-[0.8px] border-solid content-stretch flex flex-col h-[37.6px] items-start justify-center overflow-clip px-[12px] py-[8px] relative rounded-[6px] shrink-0 w-[256px]" data-name="Text Input">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#99a1af] text-[14px] w-full">2021</p>
    </div>
  );
}

function Input2() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[4px] items-start justify-self-stretch relative row-2 self-stretch shrink-0" data-name="Input">
      <Label2 />
      <TextInput4 />
    </div>
  );
}

function Label3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px] tracking-[0.3px] uppercase whitespace-nowrap">Color</p>
    </div>
  );
}

function TextInput5() {
  return (
    <div className="bg-white border-[#d1d5dc] border-[0.8px] border-solid content-stretch flex flex-col h-[37.6px] items-start justify-center overflow-clip px-[12px] py-[8px] relative rounded-[6px] shrink-0 w-[256px]" data-name="Text Input">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#99a1af] text-[14px] w-full">Silver</p>
    </div>
  );
}

function Input3() {
  return (
    <div className="col-2 content-stretch flex flex-col gap-[4px] items-start justify-self-stretch relative row-2 self-stretch shrink-0" data-name="Input">
      <Label3 />
      <TextInput5 />
    </div>
  );
}

function Label4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px] tracking-[0.3px] uppercase whitespace-nowrap">Plate Number *</p>
    </div>
  );
}

function TextInput6() {
  return (
    <div className="bg-white border-[#d1d5dc] border-[0.8px] border-solid content-stretch flex flex-col h-[37.6px] items-start justify-center overflow-clip px-[12px] py-[8px] relative rounded-[6px] shrink-0 w-[256px]" data-name="Text Input">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#99a1af] text-[14px] w-full">ABC 123</p>
    </div>
  );
}

function Input4() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[4px] items-start justify-self-stretch relative row-3 self-stretch shrink-0" data-name="Input">
      <Label4 />
      <TextInput6 />
    </div>
  );
}

function Label5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px] tracking-[0.3px] uppercase whitespace-nowrap">VIN / Chassis</p>
    </div>
  );
}

function TextInput7() {
  return (
    <div className="bg-white border-[#d1d5dc] border-[0.8px] border-solid content-stretch flex flex-col h-[37.6px] items-start justify-center overflow-clip px-[12px] py-[8px] relative rounded-[6px] shrink-0 w-[256px]" data-name="Text Input">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#99a1af] text-[14px] w-full">WBA...</p>
    </div>
  );
}

function Input5() {
  return (
    <div className="col-2 content-stretch flex flex-col gap-[4px] items-start justify-self-stretch relative row-3 self-stretch shrink-0" data-name="Input">
      <Label5 />
      <TextInput7 />
    </div>
  );
}

function Label6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px] tracking-[0.3px] uppercase whitespace-nowrap">Current KM</p>
    </div>
  );
}

function NumberInput() {
  return (
    <div className="bg-white border-[#d1d5dc] border-[0.8px] border-solid content-stretch flex flex-col h-[37.6px] items-start justify-center overflow-clip px-[12px] py-[8px] relative rounded-[6px] shrink-0 w-[528px]" data-name="Number Input">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#99a1af] text-[14px] w-full">50000</p>
    </div>
  );
}

function Input6() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Input">
      <Label6 />
      <NumberInput />
    </div>
  );
}

function Container45() {
  return (
    <div className="col-[1/span_2] content-stretch flex flex-col items-start justify-self-stretch relative row-4 self-stretch shrink-0" data-name="Container">
      <Input6 />
    </div>
  );
}

function NewJobOrder7() {
  return (
    <div className="gap-x-[16px] gap-y-[16px] grid grid-cols-[__256px_256px] grid-rows-[____57.59px_57.59px_57.59px_57.59px] relative shrink-0 w-full" data-name="NewJobOrder">
      <Input />
      <Input1 />
      <Input2 />
      <Input3 />
      <Input4 />
      <Input5 />
      <Container45 />
    </div>
  );
}

function Button12() {
  return (
    <div className="bg-[#0f2340] content-stretch flex flex-[435.925_0_0] h-full items-center justify-center min-w-px px-[16px] py-[8px] relative rounded-[4px]" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap">{`Create & Attach to Job`}</p>
    </div>
  );
}

function Button13() {
  return (
    <div className="bg-white border-[#d1d5dc] border-[0.8px] border-solid content-stretch flex h-full items-center justify-center px-[16px] py-[8px] relative rounded-[4px] shrink-0" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#364153] text-[14px] text-center whitespace-nowrap">Cancel</p>
    </div>
  );
}

function NewJobOrder8() {
  return (
    <div className="content-stretch flex gap-[12px] h-[53.6px] items-start pt-[16px] relative shrink-0 w-[528px]" data-name="NewJobOrder">
      <Button12 />
      <Button13 />
    </div>
  );
}

function Container44() {
  return (
    <div className="content-stretch flex flex-col items-start px-[24px] py-[20px] relative shrink-0 w-full" data-name="Container">
      <NewJobOrder7 />
      <NewJobOrder8 />
    </div>
  );
}

function Container42() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[424.75px] items-start left-[309.2px] max-h-[619.2000122070312px] max-w-[576px] overflow-clip rounded-[12px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] top-[131.63px] w-[576px]" data-name="Container">
      <Container43 />
      <Container44 />
    </div>
  );
}

export default function CreateAppDesign() {
  return (
    <div className="bg-[#f3f4f6] content-stretch flex flex-col items-start relative size-full" data-name="Create app design">
      <App />
      <Sidebar />
      <Header />
      <Container41 />
      <Container42 />
    </div>
  );
}