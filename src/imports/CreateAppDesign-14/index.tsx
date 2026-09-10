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

function Code() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Code">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Bold',sans-serif] font-bold leading-[16px] relative shrink-0 text-[#0f2340] text-[12px] tracking-[0.3px] whitespace-nowrap">JO-2026-00125</p>
    </div>
  );
}

function Text() {
  return (
    <div className="bg-[#eff6ff] border-[#bedbff] border-[0.8px] border-solid content-stretch flex items-start px-[8px] py-[2px] relative rounded-[4px] shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#1447e6] text-[12px] whitespace-nowrap">Open</p>
    </div>
  );
}

function Text1() {
  return (
    <div className="bg-[#f9fafb] border-[#e5e7eb] border-[0.8px] border-solid content-stretch flex items-start px-[8px] py-[2px] relative rounded-[4px] shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px] whitespace-nowrap">Full Service</p>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Container">
      <Code />
      <Text />
      <Text1 />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="content-stretch flex flex-col h-[24px] items-start pt-[4px] relative shrink-0 w-[254.25px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#6a7282] text-[14px] whitespace-nowrap">12 Aug 2026</p>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[254.25px]" data-name="Container">
      <Container3 />
      <Paragraph />
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex h-[69.6px] items-start justify-between pt-[24px] relative shrink-0 w-[922.4px]" data-name="Container">
      <Container2 />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[#99a1af] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap">Customer</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="content-stretch flex flex-col h-[32px] items-start pt-[8px] relative shrink-0 w-[419.6px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[#101828] text-[16px] whitespace-nowrap">Ahmed Mohamed</p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="content-stretch flex flex-col h-[22px] items-start pt-[2px] relative shrink-0 w-[419.6px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#6a7282] text-[14px] whitespace-nowrap">01012345678</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="content-stretch flex flex-col h-[24px] items-start pt-[8px] relative shrink-0 w-[419.6px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#254e87] text-[12px] whitespace-nowrap">View profile →</p>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-white border-[#e5e7eb] border-[0.8px] border-solid col-1 content-stretch flex flex-col items-start justify-center justify-self-stretch p-[16px] relative rounded-[10px] row-1 self-stretch shrink-0" data-name="Button">
      <Paragraph1 />
      <Paragraph2 />
      <Paragraph3 />
      <Paragraph4 />
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[#99a1af] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap">Vehicle</p>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="content-stretch flex flex-col h-[32px] items-start pt-[8px] relative shrink-0 w-[419.6px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[#101828] text-[16px] whitespace-nowrap">BMW 320i</p>
    </div>
  );
}

function Code1() {
  return (
    <div className="bg-[#f3f4f6] content-stretch flex flex-col items-start px-[6px] py-[2px] relative rounded-[4px] shrink-0" data-name="Code">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#4a5565] text-[12px] tracking-[0.3px] whitespace-nowrap">ABC 123</p>
    </div>
  );
}

function Text2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#6a7282] text-[12px] whitespace-nowrap">125,430 km</p>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex gap-[8px] h-[22px] items-center pt-[2px] relative shrink-0 w-[419.6px]" data-name="Container">
      <Code1 />
      <Text2 />
    </div>
  );
}

function Code2() {
  return (
    <div className="content-stretch flex flex-col h-[18px] items-start pt-[4px] relative shrink-0 w-[419.6px]" data-name="Code">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[13.333px] relative shrink-0 text-[#99a1af] text-[10px] tracking-[0.25px] whitespace-nowrap">WBA8E9C57JA123456</p>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="content-stretch flex flex-col h-[24px] items-start pt-[8px] relative shrink-0 w-[419.6px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#254e87] text-[12px] whitespace-nowrap">View profile →</p>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-white border-[#e5e7eb] border-[0.8px] border-solid col-2 content-stretch flex flex-col items-start justify-center justify-self-stretch p-[16px] relative rounded-[10px] row-1 self-stretch shrink-0" data-name="Button">
      <Paragraph5 />
      <Paragraph6 />
      <Container5 />
      <Code2 />
      <Paragraph7 />
    </div>
  );
}

function Container4() {
  return (
    <div className="gap-x-[16px] gap-y-[16px] grid grid-cols-[__453.20px_453.20px] grid-rows-[_144.89px] relative shrink-0 w-full" data-name="Container">
      <Button1 />
      <Button2 />
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

function JobDetail() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="JobDetail">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[#99a1af] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap">Job Team</p>
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#99a1af] text-[12px] whitespace-nowrap">Engineer</p>
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="content-stretch flex flex-col h-[28px] items-start pt-[4px] relative shrink-0 w-[94.063px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[#101828] text-[16px] whitespace-nowrap">Karim Samir</p>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[94.063px]" data-name="Container">
      <Paragraph8 />
      <Paragraph9 />
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#99a1af] text-[12px] whitespace-nowrap">Technicians</p>
    </div>
  );
}

function Text3() {
  return (
    <div className="bg-[#f3f4f6] content-stretch flex h-full items-center px-[8px] py-[2px] relative rounded-[4px] shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#364153] text-[14px] whitespace-nowrap">Hassan Ali</p>
    </div>
  );
}

function Text4() {
  return (
    <div className="bg-[#f3f4f6] content-stretch flex h-full items-center px-[8px] py-[2px] relative rounded-[4px] shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#364153] text-[14px] whitespace-nowrap">Mahmoud Samir</p>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex gap-[8px] h-[24px] items-start relative shrink-0 w-full" data-name="Container">
      <Text3 />
      <Text4 />
    </div>
  );
}

function ContainerMargin1() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0 w-full" data-name="Container:margin">
      <Container8 />
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[219.775px]" data-name="Container">
      <Paragraph10 />
      <ContainerMargin1 />
    </div>
  );
}

function JobDetail1() {
  return (
    <div className="content-stretch flex gap-[32px] items-start relative shrink-0 w-full" data-name="JobDetail">
      <Container6 />
      <Container7 />
    </div>
  );
}

function JobDetailMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[12px] relative shrink-0 w-full" data-name="JobDetail:margin">
      <JobDetail1 />
    </div>
  );
}

function Card() {
  return (
    <div className="bg-white border-[#e5e7eb] border-[0.8px] border-solid content-stretch flex flex-col items-start p-[20px] relative rounded-[10px] shrink-0 w-full" data-name="Card">
      <JobDetail />
      <JobDetailMargin />
    </div>
  );
}

function CardMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[24px] relative shrink-0 w-full" data-name="Card:margin">
      <Card />
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute border-[#0f2340] border-b-[1.6px] border-solid content-stretch flex flex-col h-[37.6px] items-center justify-center left-0 px-[16px] py-[8px] top-0 w-[134.963px]" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#0f2340] text-[14px] text-center whitespace-nowrap">Work Summary</p>
    </div>
  );
}

function ButtonMargin() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative shrink-0 w-[134.963px]" data-name="Button:margin">
      <Button3 />
    </div>
  );
}

function Button4() {
  return (
    <div className="content-stretch flex flex-col h-full items-center justify-center px-[16px] py-[8px] relative shrink-0" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#6a7282] text-[14px] text-center whitespace-nowrap">Parts</p>
    </div>
  );
}

function Container10() {
  return (
    <div className="border-[#e5e7eb] border-b-[0.8px] border-solid content-stretch flex gap-[4px] h-[37.4px] items-start relative shrink-0 w-full" data-name="Container">
      <ButtonMargin />
      <Button4 />
    </div>
  );
}

function Text5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[#364153] text-[12px] whitespace-nowrap">4</p>
    </div>
  );
}

function Text6() {
  return (
    <div className="content-stretch flex flex-col items-start opacity-80 relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#364153] text-[12px] whitespace-nowrap">Recommended</p>
    </div>
  );
}

function Container13() {
  return (
    <div className="bg-[#f3f4f6] content-stretch flex gap-[6px] items-center px-[12px] py-[6px] relative rounded-[26843500px] shrink-0" data-name="Container">
      <Text5 />
      <Text6 />
    </div>
  );
}

function Text7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[#016630] text-[12px] whitespace-nowrap">0</p>
    </div>
  );
}

function Text8() {
  return (
    <div className="content-stretch flex flex-col items-start opacity-80 relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#016630] text-[12px] whitespace-nowrap">Completed Today</p>
    </div>
  );
}

function Container14() {
  return (
    <div className="bg-[#dcfce7] content-stretch flex gap-[6px] items-center px-[12px] py-[6px] relative rounded-[26843500px] shrink-0" data-name="Container">
      <Text7 />
      <Text8 />
    </div>
  );
}

function Text9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[#973c00] text-[12px] whitespace-nowrap">2</p>
    </div>
  );
}

function Text10() {
  return (
    <div className="content-stretch flex flex-col items-start opacity-80 relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#973c00] text-[12px] whitespace-nowrap">Next Visit</p>
    </div>
  );
}

function Container15() {
  return (
    <div className="bg-[#fef3c6] content-stretch flex gap-[6px] items-center px-[12px] py-[6px] relative rounded-[26843500px] shrink-0" data-name="Container">
      <Text9 />
      <Text10 />
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full" data-name="Container">
      <Container13 />
      <Container14 />
      <Container15 />
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[#973c00] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap">○ Deferred to Next Visit</p>
    </div>
  );
}

function JobDetail2() {
  return (
    <div className="bg-[#fffbeb] border-[#fef3c6] border-b-[0.8px] border-solid content-stretch flex flex-col items-start px-[16px] py-[12px] relative shrink-0 w-full" data-name="JobDetail">
      <Paragraph11 />
    </div>
  );
}

function Text11() {
  return <div className="border-[#ffd230] border-[1.6px] border-solid relative rounded-[26843500px] shrink-0 size-[14px]" data-name="Text" />;
}

function Text12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#4a5565] text-[14px] whitespace-nowrap">Brake Pads (Front)</p>
    </div>
  );
}

function Text13() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#99a1af] text-[12px] whitespace-nowrap">Heavy wear observed</p>
    </div>
  );
}

function TextAlign() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start justify-end min-w-px relative" data-name="Text:align">
      <Text13 />
    </div>
  );
}

function Container16() {
  return (
    <div className="border-[#f9fafb] border-b-[0.8px] border-solid content-stretch flex gap-[12px] items-center px-[16px] py-[10px] relative shrink-0 w-full" data-name="Container">
      <Text11 />
      <Text12 />
      <TextAlign />
    </div>
  );
}

function Text14() {
  return <div className="border-[#ffd230] border-[1.6px] border-solid relative rounded-[26843500px] shrink-0 size-[14px]" data-name="Text" />;
}

function Text15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#4a5565] text-[14px] whitespace-nowrap">Wheel Alignment</p>
    </div>
  );
}

function Text16() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#99a1af] text-[12px] whitespace-nowrap">Recommended</p>
    </div>
  );
}

function TextAlign1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start justify-end min-w-px relative" data-name="Text:align">
      <Text16 />
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex gap-[12px] items-center px-[16px] py-[10px] relative shrink-0 w-full" data-name="Container">
      <Text14 />
      <Text15 />
      <TextAlign1 />
    </div>
  );
}

function JobDetail3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="JobDetail">
      <Container16 />
      <Container17 />
    </div>
  );
}

function Card1() {
  return (
    <div className="bg-white border-[#e5e7eb] border-[0.8px] border-solid content-stretch flex flex-col items-start relative rounded-[10px] shrink-0 w-full" data-name="Card">
      <JobDetail2 />
      <JobDetail3 />
    </div>
  );
}

function CardMargin1() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[16px] relative shrink-0 w-full" data-name="Card:margin">
      <Card1 />
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap">Recommended Work</p>
    </div>
  );
}

function JobDetail4() {
  return (
    <div className="border-[#f3f4f6] border-b-[0.8px] border-solid content-stretch flex flex-col items-start px-[16px] py-[12px] relative shrink-0 w-full" data-name="JobDetail">
      <Paragraph12 />
    </div>
  );
}

function Text17() {
  return <div className="border-[#d1d5dc] border-[0.8px] border-solid relative rounded-[26843500px] shrink-0 size-[14px]" data-name="Text" />;
}

function Text18() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#364153] text-[14px] whitespace-nowrap">{`Engine Oil & Filter`}</p>
    </div>
  );
}

function Text19() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#99a1af] text-[12px] whitespace-nowrap">5W-30 synthetic</p>
    </div>
  );
}

function TextAlign2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start justify-end min-w-px relative" data-name="Text:align">
      <Text19 />
    </div>
  );
}

function Container18() {
  return (
    <div className="border-[#f9fafb] border-b-[0.8px] border-solid content-stretch flex gap-[12px] items-center px-[16px] py-[10px] relative shrink-0 w-full" data-name="Container">
      <Text17 />
      <Text18 />
      <TextAlign2 />
    </div>
  );
}

function Text20() {
  return <div className="border-[#d1d5dc] border-[0.8px] border-solid relative rounded-[26843500px] shrink-0 size-[14px]" data-name="Text" />;
}

function Text21() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#364153] text-[14px] whitespace-nowrap">Air Filter</p>
    </div>
  );
}

function Text22() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#99a1af] text-[12px] whitespace-nowrap">Clogged</p>
    </div>
  );
}

function TextAlign3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start justify-end min-w-px relative" data-name="Text:align">
      <Text22 />
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex gap-[12px] items-center px-[16px] py-[10px] relative shrink-0 w-full" data-name="Container">
      <Text20 />
      <Text21 />
      <TextAlign3 />
    </div>
  );
}

function JobDetail5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="JobDetail">
      <Container18 />
      <Container19 />
    </div>
  );
}

function Card2() {
  return (
    <div className="bg-white border-[#e5e7eb] border-[0.8px] border-solid content-stretch flex flex-col items-start relative rounded-[10px] shrink-0 w-full" data-name="Card">
      <JobDetail4 />
      <JobDetail5 />
    </div>
  );
}

function CardMargin2() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[16px] relative shrink-0 w-full" data-name="Card:margin">
      <Card2 />
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col h-[322.4px] items-start pt-[16px] relative shrink-0 w-[922.4px]" data-name="Container">
      <Container12 />
      <CardMargin1 />
      <CardMargin2 />
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col h-[383.8px] items-start pt-[24px] relative shrink-0 w-[922.4px]" data-name="Container">
      <Container10 />
      <Container11 />
    </div>
  );
}

function Button5() {
  return (
    <div className="bg-[#eef3fb] border-[#0f2340] border-[0.8px] border-solid content-stretch flex h-full items-center justify-center px-[16px] py-[8px] relative rounded-[4px] shrink-0" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#0f2340] text-[14px] text-center whitespace-nowrap">Print Job Order</p>
    </div>
  );
}

function Button6() {
  return (
    <div className="content-stretch flex h-full items-center justify-center px-[16px] py-[8px] relative rounded-[4px] shrink-0" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#4a5565] text-[14px] text-center whitespace-nowrap">Back</p>
    </div>
  );
}

function Container20() {
  return (
    <div className="border-[#f3f4f6] border-solid border-t-[0.8px] content-stretch flex gap-[12px] h-[46.4px] items-start pt-[8px] relative shrink-0 w-full" data-name="Container">
      <Button5 />
      <Button6 />
    </div>
  );
}

function ContainerMargin2() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[24px] relative shrink-0 w-full" data-name="Container:margin">
      <Container20 />
    </div>
  );
}

function App() {
  return (
    <div className="bg-[#f3f4f6] content-stretch flex flex-col h-[962.287px] items-start min-h-[688px] pb-[24px] pl-[248px] pr-[24px] pt-[80px] relative shrink-0 w-full" data-name="App">
      <Container />
      <Container1 />
      <ContainerMargin />
      <CardMargin />
      <Container9 />
      <ContainerMargin2 />
    </div>
  );
}

function Body() {
  return (
    <div className="content-stretch flex flex-col h-[962px] items-start relative shrink-0 w-[1194px]" data-name="Body">
      <App />
    </div>
  );
}

function Container22() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[28px]" data-name="Container">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Bold',sans-serif] font-bold leading-[16px] relative shrink-0 text-[12px] text-[rgba(255,255,255,0.9)] whitespace-nowrap">SA</p>
    </div>
  );
}

function Paragraph13() {
  return (
    <div className="content-stretch flex flex-col h-[15px] items-start overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15px] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap">Star Auto Center</p>
    </div>
  );
}

function Paragraph14() {
  return (
    <div className="content-stretch flex flex-col h-[17px] items-start pt-[2px] relative shrink-0 w-[96.563px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[10px] text-[rgba(255,255,255,0.4)] tracking-[0.5px] uppercase whitespace-nowrap">Engineer</p>
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[96.563px]" data-name="Container">
      <Paragraph13 />
      <Paragraph14 />
    </div>
  );
}

function Container21() {
  return (
    <div className="border-[rgba(255,255,255,0.1)] border-b-[0.8px] border-solid content-stretch flex gap-[10px] items-center p-[20px] relative shrink-0 w-full" data-name="Container">
      <Container22 />
      <Container23 />
    </div>
  );
}

function Text23() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-80 relative shrink-0 w-[16px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] text-center whitespace-nowrap">⊞</p>
    </div>
  );
}

function Text24() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] whitespace-nowrap">Dashboard</p>
    </div>
  );
}

function Button7() {
  return (
    <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[10px] relative shrink-0 w-[224px]" data-name="Button">
      <Text23 />
      <Text24 />
    </div>
  );
}

function Text25() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-80 relative shrink-0 w-[16px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] text-center whitespace-nowrap">◉</p>
    </div>
  );
}

function Text26() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] whitespace-nowrap">Customers</p>
    </div>
  );
}

function Button8() {
  return (
    <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[10px] relative shrink-0 w-[224px]" data-name="Button">
      <Text25 />
      <Text26 />
    </div>
  );
}

function Text27() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-80 relative shrink-0 w-[16px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] text-center whitespace-nowrap">◈</p>
    </div>
  );
}

function Text28() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] whitespace-nowrap">Vehicles</p>
    </div>
  );
}

function Button9() {
  return (
    <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[10px] relative shrink-0 w-[224px]" data-name="Button">
      <Text27 />
      <Text28 />
    </div>
  );
}

function Text29() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-80 relative shrink-0 w-[16px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] text-center whitespace-nowrap">◫</p>
    </div>
  );
}

function Text30() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] whitespace-nowrap">Job Orders</p>
    </div>
  );
}

function Button10() {
  return (
    <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[10px] relative shrink-0 w-[224px]" data-name="Button">
      <Text29 />
      <Text30 />
    </div>
  );
}

function Navigation() {
  return (
    <div className="content-stretch flex flex-[515.413_0_0] flex-col items-start min-h-px overflow-clip py-[16px] relative w-full" data-name="Navigation">
      <Button7 />
      <Button8 />
      <Button9 />
      <Button10 />
    </div>
  );
}

function Container26() {
  return (
    <div className="bg-[rgba(255,255,255,0.15)] content-stretch flex items-center justify-center relative rounded-[26843500px] shrink-0 size-[28px]" data-name="Container">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap">KS</p>
    </div>
  );
}

function Paragraph15() {
  return (
    <div className="content-stretch flex flex-col h-[15.988px] items-start overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.8)] whitespace-nowrap">Karim Samir</p>
    </div>
  );
}

function Paragraph16() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[10px] text-[rgba(255,255,255,0.35)] tracking-[0.5px] uppercase whitespace-nowrap">Engineer</p>
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex flex-[146_0_0] flex-col items-start min-w-px relative" data-name="Container">
      <Paragraph15 />
      <Paragraph16 />
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-[184px]" data-name="Container">
      <Container26 />
      <Container27 />
    </div>
  );
}

function ContainerMargin3() {
  return (
    <div className="content-stretch flex flex-col items-center pb-[12px] relative shrink-0 w-full" data-name="Container:margin">
      <Container25 />
    </div>
  );
}

function Button11() {
  return (
    <div className="absolute h-[15.988px] left-0 top-[5.6px] w-[184px]" data-name="Button">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[12px] text-[rgba(255,255,255,0.35)] top-0 whitespace-nowrap">→ Sign out</p>
    </div>
  );
}

function Container28() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <Button11 />
    </div>
  );
}

function Container24() {
  return (
    <div className="border-[rgba(255,255,255,0.1)] border-solid border-t-[0.8px] content-stretch flex flex-col items-start px-[20px] py-[16px] relative shrink-0 w-full" data-name="Container">
      <ContainerMargin3 />
      <Container28 />
    </div>
  );
}

function Sidebar() {
  return (
    <div className="absolute bg-[#060f1e] content-stretch flex flex-col h-[962px] items-start left-0 top-0 w-[224px]" data-name="Sidebar">
      <Container21 />
      <Navigation />
      <Container24 />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col h-[20px] items-start pr-[16px] relative shrink-0 w-[134px]" data-name="Heading 1">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] whitespace-nowrap">Job Order Details</p>
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

function Container29() {
  return (
    <div className="flex-[448_0_0] h-[33.6px] max-w-[448px] min-w-px relative" data-name="Container">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[12.24px] not-italic text-[#99a1af] text-[12px] top-[8.8px] whitespace-nowrap">🔍</p>
      <TextInput />
    </div>
  );
}

function Text31() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#6a7282] text-[14px] text-center whitespace-nowrap">🔔</p>
    </div>
  );
}

function Text32() {
  return <div className="absolute bg-[#fb2c36] border-[0.8px] border-solid border-white left-[20px] rounded-[26843500px] size-[8px] top-[4px]" data-name="Text" />;
}

function Button12() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[26843500px] shrink-0 size-[32px]" data-name="Button">
      <Text31 />
      <Text32 />
    </div>
  );
}

function Paragraph17() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[15px] not-italic relative shrink-0 text-[#101828] text-[12px] text-right whitespace-nowrap">Karim Samir</p>
    </div>
  );
}

function Paragraph18() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] capitalize font-['Inter:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[#99a1af] text-[10px] text-right whitespace-nowrap">engineer</p>
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[69.575px]" data-name="Container">
      <Paragraph17 />
      <Paragraph18 />
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Container">
      <Button12 />
      <Container31 />
    </div>
  );
}

function ContainerAlign() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start justify-end min-w-px relative" data-name="Container:align">
      <Container30 />
    </div>
  );
}

function Header() {
  return (
    <div className="absolute bg-white border-[#e5e7eb] border-b-[0.8px] border-solid content-stretch flex gap-[16px] h-[56px] items-center left-[224px] px-[24px] top-0 w-[970.4px]" data-name="Header">
      <Heading />
      <Container29 />
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