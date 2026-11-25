/* Data for the companion to George Perkovich, India’s Nuclear Bomb (University of California Press, 1999).
   Page numbers are the book’s printed page numbers. */
var DATA = {};

DATA.pms = [
  {n:"Jawaharlal Nehru", a:1947.62, b:1964.40, k:"nehru"},
  {n:"Lal Bahadur Shastri", a:1964.44, b:1966.03, k:"shastri"},
  {n:"Indira Gandhi", a:1966.07, b:1977.23, k:"indira"},
  {n:"Morarji Desai", a:1977.23, b:1979.57, k:"desai"},
  {n:"Charan Singh", a:1979.57, b:1980.04, k:"charan"},
  {n:"Indira Gandhi", a:1980.04, b:1984.83, k:"indira"},
  {n:"Rajiv Gandhi", a:1984.83, b:1989.92, k:"rajiv"},
  {n:"V. P. Singh", a:1989.92, b:1990.86, k:"vp"},
  {n:"Chandra Shekhar", a:1990.86, b:1991.47, k:"cs"},
  {n:"P. V. Narasimha Rao", a:1991.47, b:1996.37, k:"rao"},
  {n:"Vajpayee (May 1996)", a:1996.37, b:1996.42, k:"vajpayee"},
  {n:"H. D. Deve Gowda", a:1996.42, b:1997.30, k:"gowda"},
  {n:"I. K. Gujral", a:1997.30, b:1998.21, k:"gujral"},
  {n:"A. B. Vajpayee", a:1998.21, b:1999.0, k:"vajpayee"}
];
DATA.aec = [
  {n:"Homi Bhabha", a:1948.6, b:1966.07},
  {n:"Vikram Sarabhai", a:1966.4, b:1971.99},
  {n:"Homi Sethna", a:1972.0, b:1983.7},
  {n:"Raja Ramanna", a:1983.7, b:1987.1},
  {n:"M. R. Srinivasan", a:1987.1, b:1990.1},
  {n:"P. K. Iyengar", a:1990.1, b:1993.1},
  {n:"R. Chidambaram", a:1993.1, b:1999.0}
];
DATA.drdo = [
  {n:"B. D. Nag Chaudhuri", a:1970.5, b:1974.5},
  {n:"M. G. K. Menon", a:1974.5, b:1978.5},
  {n:"Raja Ramanna", a:1978.5, b:1982.3},
  {n:"V. S. Arunachalam", a:1982.3, b:1992.5},
  {n:"A. P. J. Abdul Kalam", a:1992.5, b:1999.0}
];
DATA.pak = [
  {n:"Ayub Khan", a:1958.8, b:1969.23},
  {n:"Yahya Khan", a:1969.23, b:1971.97},
  {n:"Zulfikar Ali Bhutto", a:1971.97, b:1977.5},
  {n:"Zia ul-Haq", a:1977.5, b:1988.63},
  {n:"Benazir Bhutto", a:1988.92, b:1990.6},
  {n:"Nawaz Sharif", a:1990.85, b:1993.5},
  {n:"Benazir Bhutto", a:1993.8, b:1996.85},
  {n:"Nawaz Sharif", a:1997.13, b:1999.0}
];
DATA.us = [
  {n:"Truman", a:1947.0, b:1953.05},
  {n:"Eisenhower", a:1953.05, b:1961.05},
  {n:"Kennedy", a:1961.05, b:1963.9},
  {n:"Johnson", a:1963.9, b:1969.05},
  {n:"Nixon", a:1969.05, b:1974.6},
  {n:"Ford", a:1974.6, b:1977.05},
  {n:"Carter", a:1977.05, b:1981.05},
  {n:"Reagan", a:1981.05, b:1989.05},
  {n:"Bush", a:1989.05, b:1993.05},
  {n:"Clinton", a:1993.05, b:1999.0}
];

/* c: prog = India’s programme, pol = Indian politics and wars, pak = Pakistan and China, world = treaties and US policy */
DATA.events = [
 {y:1948.3,c:"prog",ch:1,p:"p. 18",t:"Atomic Energy Act and Commission",d:"Parliament puts atomic research under state control and secrecy. Bhabha chairs the new Atomic Energy Commission and reports to Nehru alone."},
 {y:1953.55,c:"world",ch:1,p:"p. 22",t:"Thorium nitrate row",d:"Washington threatens to cut aid over an Indian thorium nitrate shipment bound for China. Nehru refuses to let US law dictate Indian trade. An early sign of the sovereignty quarrels to come."},
 {y:1953.95,c:"world",ch:1,p:"p. 25",t:"Atoms for Peace",d:"8 December 1953. Eisenhower’s programme declassifies reactor and reprocessing know-how and offers it abroad. India’s programme grows on this open door."},
 {y:1954.85,c:"prog",ch:1,p:"p. 26",t:"Bhabha’s three-stage plan",d:"Natural uranium reactors first, then plutonium and thorium, then thorium breeders. Plutonium sits at the centre of the plan from the start."},
 {y:1955.5,c:"prog",ch:1,p:"pp. 27, 30",t:"Canada offers CIRUS",d:"A 40-megawatt research reactor under the Colombo Plan, with American heavy water. The only condition is a pledge of peaceful use."},
 {y:1956.6,c:"prog",ch:1,p:"p. 27",t:"Apsara goes critical",d:"India’s first reactor, built from British drawings and run on British enriched uranium."},
 {y:1960.5,c:"prog",ch:1,p:"p. 27",t:"CIRUS starts up",d:"Indian engineers race to make the first fuel load themselves, to strengthen India’s claim over the plutonium."},
 {y:1961.3,c:"prog",ch:1,p:"p. 28",t:"Phoenix plant begun",d:"A plutonium separation plant at Trombay using the Purex process, with blueprints from an American firm."},
 {y:1962.85,c:"pol",ch:1,p:"pp. 44–46",t:"War with China",d:"India’s defeat on the Himalayan border shakes Nehru’s foreign policy and sharpens the security debate."},
 {y:1963.6,c:"world",ch:1,p:"pp. 55–56",t:"Tarapur agreement",d:"The United States agrees to build two light-water power reactors at Tarapur and to supply their enriched fuel, under safeguards."},
 {y:1964.40,c:"pol",ch:2,p:"pp. 63–64",t:"Nehru dies; Shastri takes over",d:"27 May 1964. The one leader who fully controlled nuclear policy is gone. Shastri is a Gandhian with little taste for the bomb."},
 {y:1964.5,c:"prog",ch:1,p:"pp. 28, 64, 71",t:"First weapon-grade plutonium",d:"The first used fuel from CIRUS enters the Phoenix plant in June 1964. Perkovich dates the first weapon-grade plutonium to 1964 on one page and to early 1965 on another. Either way the raw material for a device now exists."},
 {y:1964.79,c:"pak",ch:2,p:"pp. 60, 66",t:"China tests at Lop Nor",d:"16 October 1964. The test sets off India’s first open bomb debate."},
 {y:1964.82,c:"prog",ch:2,p:"pp. 65, 67–68, 71",t:"Bhabha’s two claims",d:"4 October, London: Bhabha says India could explode a bomb within eighteen months of a decision. 24 October, All India Radio: he says a ten-kiloton explosion would cost about $350,000. Perkovich shows that both claims were hollow."},
 {y:1964.91,c:"prog",ch:2,p:"pp. 82–85",t:"The first compromise",d:"27 November 1964. In the Lok Sabha Shastri again refuses a bomb but, citing Bhabha, endorses work on nuclear devices for peaceful uses such as tunnelling. The approval covers theoretical studies only. Press and Parliament miss what has happened."},
 {y:1965.15,c:"world",ch:3,p:"pp. 86, 90–98",t:"Bhabha asks Washington for help",d:"January and February 1965. He sounds out American officials about a Plowshare device, and tells one that with a US blueprint India could do the job in six months. The Americans decline."},
 {y:1965.7,c:"pol",ch:4,p:"pp. 106–110",t:"War with Pakistan",d:"August and September 1965. India holds Kashmir and pushes towards Lahore; the Tashkent Declaration follows in January. Perkovich suggests that fear of a coming Indian bomb helped push Pakistan to gamble on war (p. 108)."},
 {y:1966.03,c:"pol",ch:4,p:"p. 112",t:"Shastri dies; Indira Gandhi becomes PM",d:"11 January, at Tashkent. A new and politically weak prime minister inherits the nuclear question."},
 {y:1966.07,c:"prog",ch:4,p:"p. 113",t:"Bhabha killed on Mont Blanc",d:"24 January. The programme loses its founder within a fortnight of losing Shastri."},
 {y:1966.42,c:"prog",ch:4,p:"pp. 121–123, 140",t:"Sarabhai takes charge",d:"Late May 1966. The new chairman doubts the value of nuclear explosions of any kind, says so publicly on 1 June, and orders the explosive study closed. The scientists carry on quietly."},
 {y:1968.0,c:"prog",ch:5,p:"pp. 140–141",t:"Secret design work begins",d:"Ramanna sets Chidambaram to derive plutonium’s equation of state. The team works around Sarabhai, without explicit orders from the prime minister."},
 {y:1968.5,c:"world",ch:5,p:"pp. 138, 143",t:"India refuses the NPT",d:"12 June 1968. India helped to shape the treaty talks but votes against the result as unequal: it freezes five states as weapon powers and binds everyone else. The cabinet had decided not to sign in May 1967."},
 {y:1969.8,c:"prog",ch:6,p:"p. 469",t:"Tarapur starts generating",d:"India’s first power station, American-built and safeguarded."},
 {y:1970.2,c:"world",ch:6,p:"p. 177",t:"NPT enters into force",d:"A new international norm now stands against testing."},
 {y:1970.5,c:"prog",ch:6,p:"pp. 149–150",t:"Purnima built off the books",d:"A small pulsed fast reactor at Trombay, assembled from borrowed parts, to give the designers the data they needed."},
 {y:1971.6,c:"pol",ch:7,p:"p. 163",t:"Indo-Soviet treaty",d:"9 August 1971. India gains a great-power backer before the war over East Pakistan."},
 {y:1971.95,c:"pol",ch:7,p:"pp. 164–166",t:"Bangladesh war",d:"India defeats Pakistan. The US sends the carrier Enterprise into the Bay of Bengal."},
 {y:1971.99,c:"prog",ch:7,p:"p. 160",t:"Sarabhai dies; Sethna leads the AEC",d:"30 December 1971. The main internal opponent of an explosion is gone."},
 {y:1972.05,c:"pak",ch:7,p:"pp. 165, 194",t:"Bhutto launches Pakistan’s bomb",d:"A secret meeting in January 1972, weeks after the defeat."},
 {y:1972.4,c:"prog",ch:7,p:"p. 149",t:"Purnima operates",d:"May 1972. The design is finalised with its data."},
 {y:1972.7,c:"prog",ch:7,p:"pp. 171–172",t:"Indira Gandhi’s green light",d:"7 September 1972, by Sethna’s account. Formal approval for final preparations. Work speeds up on every component at once."},
 {y:1973.2,c:"prog",ch:7,p:"p. 172",t:"Explosive system tested",d:"March 1973. The chemical explosives that will squeeze the core are fired without plutonium."},
 {y:1974.38,c:"prog",ch:7,p:"p. 178",t:"Pokhran: the “peaceful nuclear explosion”",d:"18 May 1974, 8:05 a.m., 107 metres underground. The government calls it peaceful and says it wants no weapons."},
 {y:1975.3,c:"world",ch:8,p:"p. 191",t:"Nuclear Suppliers Group",d:"Kissinger convenes exporters in London. They agree a list of controlled technology. India sees a cartel."},
 {y:1975.48,c:"pol",ch:8,p:"pp. 191–192",t:"The Emergency",d:"25–26 June 1975. Indira Gandhi suspends normal politics. The nuclear programme drifts."},
 {y:1976.0,c:"pak",ch:8,p:"pp. 195–196",t:"A. Q. Khan and the centrifuge",d:"December 1975. On leave from the Netherlands, Khan agrees to stay in Pakistan and run uranium enrichment. A Dutch court later finds he took URENCO centrifuge designs with him. The Kahuta project starts in July 1976."},
 {y:1976.45,c:"world",ch:8,p:"p. 198",t:"Symington Amendment",d:"No US aid to states importing enrichment or reprocessing technology without full safeguards."},
 {y:1977.23,c:"pol",ch:8,p:"p. 202",t:"Desai becomes PM",d:"The Janata government takes office. Desai tells the US ambassador he will never develop a bomb."},
 {y:1978.2,c:"world",ch:8,p:"pp. 206–209",t:"US Nuclear Non-Proliferation Act",d:"10 March 1978. American law now demands safeguards on all of a customer’s facilities. Fuel for Tarapur becomes a running dispute."},
 {y:1979.25,c:"pak",ch:8,p:"p. 217",t:"Kahuta comes on line",d:"March 1979. US intelligence tells Congress the centrifuge plant is being commissioned. Bhutto is hanged in April."},
 {y:1979.98,c:"world",ch:8,p:"p. 221",t:"Soviet invasion of Afghanistan",d:"Washington lifts its sanctions on Pakistan and for ten years applies only mild pressure on its bomb effort."},
 {y:1980.04,c:"pol",ch:9,p:"pp. 222, 224",t:"Indira Gandhi returns",d:"January 1980. She revives the weapon scientists’ work but stops short of testing."},
 {y:1980.55,c:"prog",ch:9,p:"p. 245",t:"SLV-3 reaches orbit",d:"July 1980. A satellite launcher is also proof of a rocket that could carry a warhead."},
 {y:1981.45,c:"prog",ch:9,p:"p. 240",t:"Air force studies a strike on Kahuta",d:"June 1981. Planners think Jaguars could do it but expect to lose perhaps half of them."},
 {y:1983.0,c:"prog",ch:9,p:"pp. 242–243",t:"A second test approved, then cancelled",d:"Late 1982 or early 1983. Indira Gandhi tentatively agrees, then changes her mind within twenty-four hours."},
 {y:1983.55,c:"prog",ch:9,p:"pp. 244–248",t:"Missile programme launched",d:"The Integrated Guided Missile Development Programme under Kalam: five missiles at once, including Prithvi and Agni."},
 {y:1984.83,c:"pol",ch:10,p:"pp. 259, 262",t:"Indira Gandhi assassinated; Rajiv Gandhi PM",d:"31 October 1984. Rajiv is drawn to high technology and to disarmament, and is ambivalent about the bomb."},
 {y:1985.6,c:"prog",ch:10,p:"pp. 271, 274",t:"Dhruva and the Sundarji committee",d:"A 100-megawatt unsafeguarded reactor starts up. An informal committee costs a “minimum deterrent” with a no-first-use doctrine."},
 {y:1985.65,c:"world",ch:10,p:"p. 270",t:"Pressler Amendment",d:"US aid to Pakistan may continue only if the president certifies each year that Pakistan has no nuclear device."},
 {y:1987.05,c:"pak",ch:10,p:"pp. 279–281",t:"Brasstacks and A. Q. Khan’s claim",d:"A huge Indian army exercise turns into a border crisis, defused on 4 February 1987. On 28 January Khan tells the journalist Kuldip Nayar that Pakistan has weapon-grade uranium and will use the bomb if its existence is threatened. The interview appears only on 1 March, after the crisis."},
 {y:1988.13,c:"prog",ch:11,p:"p. 295",t:"Prithvi flies",d:"18 February 1988. A 150-kilometre missile, five years after the programme began."},
 {y:1988.42,c:"pol",ch:11,p:"p. 298",t:"Rajiv Gandhi’s Action Plan",d:"He proposes at the UN a staged elimination of all nuclear weapons by 2010. The weapon states ignore it."},
 {y:1988.9,c:"prog",ch:11,p:"pp. 293–294",t:"Weapons readied for assembly",d:"Between 1988 and 1990, by one account, at least two dozen weapons are prepared for quick assembly and delivery by aircraft."},
 {y:1989.39,c:"prog",ch:11,p:"p. 301",t:"Agni flies",d:"22 May 1989. Billed as a “technology demonstrator” for re-entry vehicles."},
 {y:1989.92,c:"pol",ch:11,p:"p. 304",t:"V. P. Singh PM",d:"A minority coalition takes over as Kashmir erupts."},
 {y:1990.4,c:"pak",ch:11,p:"pp. 304–310",t:"Kashmir crisis and the Gates mission",d:"Spring 1990. Washington fears escalation and sends Robert Gates to both capitals."},
 {y:1990.8,c:"world",ch:11,p:"p. 312",t:"Pressler sanctions invoked",d:"October 1990. President Bush can no longer certify Pakistan. US aid is cut off."},
 {y:1991.47,c:"pol",ch:12,p:"pp. 320–321",t:"Narasimha Rao PM",d:"Economic crisis and reform dominate. Rao is cautious on everything nuclear."},
 {y:1992.3,c:"world",ch:12,p:"pp. 328, 338",t:"Suppliers tighten controls",d:"The Nuclear Suppliers Group adds dual-use items and requires full-scope safeguards for new sales."},
 {y:1994.5,c:"prog",ch:12,p:"p. 349",t:"Deliverable designs complete",d:"By mid-1994 designs for fission weapons carried by aircraft and missile are finished and their components tested. Control stays with civilians."},
 {y:1995.37,c:"world",ch:13,p:"pp. 360–361",t:"NPT made permanent",d:"11 May 1995. The treaty is extended indefinitely. In India this reads as nuclear inequality made permanent."},
 {y:1995.96,c:"prog",ch:13,p:"p. 368",t:"Test preparations exposed",d:"15 December 1995. The New York Times reports that US satellites have seen activity at Pokhran. Rao does not test."},
 {y:1996.38,c:"prog",ch:13,p:"pp. 353, 374–375",t:"Vajpayee’s twelve days",d:"May 1996. He signals the scientists to proceed, then tells them to wait for the confidence vote, which he loses on 28 May. At least one device is already in a shaft."},
 {y:1996.63,c:"world",ch:14,p:"pp. 379–384",t:"India rejects the test ban",d:"20 June 1996: India announces its objections. 14 and 20 August: it blocks consensus at Geneva. 10 September: the UN General Assembly adopts the treaty by 158 votes to 3. India refuses the Comprehensive Test Ban Treaty at Geneva, objecting to the absence of a disarmament timetable and to a clause that makes its signature a condition of the treaty’s entry into force."},
 {y:1997.3,c:"pol",ch:14,p:"pp. 394, 399",t:"Gujral PM",d:"21 April 1997. He opens talks with Pakistan and declines the scientists’ requests to test."},
 {y:1998.21,c:"pol",ch:15,p:"pp. 407–409",t:"BJP-led government",d:"19 March 1998. Vajpayee returns at the head of a coalition whose main party wants the bomb in the open."},
 {y:1998.27,c:"pak",ch:15,p:"pp. 409–410",t:"Pakistan’s Ghauri missile",d:"6 April 1998. The missile flies perhaps 800 kilometres; Pakistan claims a range of 1,500. The test catches Indian intelligence by surprise."},
 {y:1998.36,c:"prog",ch:15,p:"pp. 2, 416–419",t:"Pokhran II",d:"11 May, 3:45 p.m.: three devices fired together. 13 May: two more. India declares itself a nuclear weapon state."},
 {y:1998.41,c:"pak",ch:15,p:"pp. 433–434",t:"Pakistan tests at Chagai",d:"28 May: a reported five devices. 30 May: one more."}
];

DATA.decisions = [
 {id:"d64", yr:"1964", pm:"Shastri", title:"After China’s bomb: the “peaceful explosive” compromise", out:"hold",
  steps:[
   {who:"China", t:"16 October 1964: China tests a bomb at Lop Nor. India has lost a border war to China two years earlier."},
   {who:"Homi Bhabha", t:"Says in London on 4 October that India could explode a bomb within eighteen months, and on the radio on 24 October that an explosion would cost very little (pp. 65, 67–68). The claims shape the whole debate, and they are wrong (p. 71)."},
   {who:"Parliament and Congress party", t:"A real public debate follows. Many MPs want a bomb. Most take Bhabha’s timetable for granted (p. 77)."},
   {who:"Lal Bahadur Shastri", t:"Resists. A bomb would break with Gandhi and Nehru and cost money India does not have. He looks abroad for security guarantees instead."},
   {who:"Shastri and Bhabha", t:"27 November 1964: the compromise. No bomb, but work on nuclear devices for peaceful uses, limited to theoretical studies (pp. 82–85)."}
  ],
  result:"The option stays open and the moral line holds. Bhabha’s team could not in fact deliver quickly, and in 1965 he asked Washington for help (p. 86). By January 1966 both men were dead."},
 {id:"d74", yr:"1972–74", pm:"Indira Gandhi", title:"The first test: scientists propose, the prime minister disposes", out:"go",
  steps:[
   {who:"Ramanna, Sethna, Iyengar, Chidambaram", t:"Since 1968 the Trombay group has been designing a device without explicit political orders, working around their own chairman, Sarabhai (pp. 141, 150)."},
   {who:"Indira Gandhi", t:"7 September 1972, by Sethna’s account: formal approval to make final preparations (pp. 171–172)."},
   {who:"A handful of advisers", t:"Early 1974: a round of small meetings. Haksar and Dhar warn about the economy and timing. Ramanna says it is too late to stop (pp. 174–175)."},
   {who:"Cabinet and armed forces", t:"Not consulted. The defence minister is told on 8 May. The foreign minister gets forty-eight hours’ notice. The military has no plan for nuclear weapons at all (pp. 174, 177)."},
   {who:"Indira Gandhi", t:"Listens in silence and decides. The device is fired on 18 May 1974 (pp. 176, 178)."}
  ],
  result:"A burst of national pride and a lift for a beleaguered prime minister. Abroad: Canadian and American penalties and tighter export controls. No weapons programme follows. Perkovich’s verdict is that the test came from scientific momentum and domestic politics, not from a security strategy (p. 178)."},
 {id:"d83", yr:"1982–83", pm:"Indira Gandhi", title:"The test that lasted twenty-four hours", out:"stop",
  steps:[
   {who:"Pakistan", t:"Kahuta is running. India’s air force has studied bombing it and judged the cost too high (p. 240)."},
   {who:"Ramanna and Arunachalam", t:"The scientists have improved the initiator, the timing of the explosives and the size of the device since 1974. They want a full test to prove it (p. 242)."},
   {who:"Indira Gandhi", t:"After a meeting with the scientists she tentatively approves a test (p. 243)."},
   {who:"Indira Gandhi", t:"Within twenty-four hours she reverses herself. The message travels from Venkataraman to Arunachalam to Ramanna (p. 243)."}
  ],
  result:"No test. Later in 1983 the government launches the missile programme. Perkovich finds no evidence that foreign pressure caused the reversal and thinks her advisers’ warnings about aid and loans more likely (pp. 243–244). The episode can be reconstructed only from interviews."},
 {id:"d95", yr:"1995–96", pm:"Rao, Vajpayee, Deve Gowda", title:"Three prime ministers and one prepared shaft", out:"stop",
  steps:[
   {who:"The treaties", t:"1995: the NPT is extended for ever and test ban talks are closing. If India is ever to test, the window is shutting."},
   {who:"Chidambaram and Kalam", t:"Press Rao to allow tests. Rao authorises preparations at Pokhran, but has not made up his mind to fire (pp. 365–366, 370)."},
   {who:"US satellites and the press", t:"15 December 1995: the New York Times reports the activity. Ambassador Wisner presses Rao’s circle in private (p. 368)."},
   {who:"P. V. Narasimha Rao", t:"Does not test. His advisers warn that sanctions would hurt a reforming economy (p. 370)."},
   {who:"A. B. Vajpayee", t:"May 1996: in office for twelve days, he gives the signal to test, then tells the scientists to wait for the confidence vote, which he loses (pp. 353, 374–375)."},
   {who:"H. D. Deve Gowda", t:"Inherits at least one device already placed in a shaft. He does not say no, but he does not treat it as urgent. The device is removed in late summer 1996 (pp. 353–354, 376)."}
  ],
  result:"Three prime ministers come to the edge and step back. The scientists are ready and frustrated. The question is now only who will say yes."},
 {id:"d98", yr:"1998", pm:"Vajpayee", title:"The bombs that roared", out:"go",
  steps:[
   {who:"Bharatiya Janata Party", t:"Its manifesto promises to “exercise the option to induct nuclear weapons”. Unlike every earlier ruling party it rejects the old moral aversion to the bomb (pp. 2, 407)."},
   {who:"A. B. Vajpayee", t:"Takes office on 19 March. In public the line is moderate: a strategic review first (p. 408)."},
   {who:"Pakistan", t:"6 April: the Ghauri missile flies (p. 409)."},
   {who:"Vajpayee, Brajesh Mishra and a few others", t:"The go-ahead probably reaches the scientists in late March. The prime minister must approve three steps: lowering the devices, sealing the shafts, and firing (pp. 365, 412)."},
   {who:"Other parties and the military", t:"Not consulted. A handful of BJP leaders decide. The defence minister is told two days before; the service chiefs on 10 May (pp. 404, 416)."},
   {who:"Chidambaram, Kalam and their teams", t:"11 May, 3:45 p.m.: three devices fired together. Mishra takes the telephone call and tells Vajpayee (pp. 2, 416). Two more follow on 13 May (p. 419)."}
  ],
  result:"India declares itself a nuclear weapon state. Pakistan answers on 28 and 30 May. Sanctions follow under the Glenn Amendment. No doctrine had been prepared, and outside experts doubt the claimed hydrogen bomb (pp. 4, 426–428)."}
];

DATA.ladder = {
 india:[
  {y:1956,t:"A working reactor",d:"Apsara. Skills and people, not yet bomb material.",p:"p. 27"},
  {y:1960,t:"A plutonium-producing reactor",d:"CIRUS, free of real safeguards.",p:"p. 27"},
  {y:1964,t:"Separated plutonium",d:"Phoenix delivers the first weapon-grade metal.",p:"p. 28"},
  {y:1968,t:"A design team",d:"Equation of state work begins at Trombay.",p:"p. 140"},
  {y:1974,t:"A tested device",d:"Pokhran. Large, crude, not a weapon.",p:"pp. 178, 183"},
  {y:1983,t:"Missiles on the drawing board",d:"The guided missile programme starts.",p:"p. 244"},
  {y:1988,t:"Weapons ready to assemble",d:"About two dozen, for delivery by aircraft.",p:"p. 293"},
  {y:1994,t:"Aircraft and missile designs complete",d:"Components tested, cores kept apart.",p:"p. 349"},
  {y:1998,t:"Tested and declared",d:"Five tests announced. Weapon state claimed.",p:"pp. 404, 416–419"}
 ],
 pak:[
  {y:1972,t:"A political decision",d:"Bhutto’s secret meeting with scientists.",p:"p. 165"},
  {y:1976,t:"Centrifuge designs in hand",d:"A. Q. Khan takes charge of enrichment.",p:"pp. 195–196"},
  {y:1979,t:"Enrichment plant running",d:"Kahuta is commissioned.",p:"p. 217"},
  {y:1987,t:"A claimed bomb",d:"Khan’s statement during Brasstacks.",p:"p. 281"},
  {y:1990,t:"Weapons ready to assemble",d:"Washington can no longer certify otherwise.",p:"pp. 305, 312"},
  {y:1998,t:"Tested and declared",d:"Ghauri in April, Chagai in May.",p:"pp. 409, 433"}
 ]
};

DATA.road74 = [
 {y:"1960",t:"CIRUS reactor running",p:"p. 27"},
 {y:"1964",t:"Weapon-grade plutonium separated at Phoenix",p:"p. 28"},
 {y:"1968–71",t:"Equation of state for plutonium worked out",p:"pp. 140–141"},
 {y:"End 1971",t:"Basic design of the device ready",p:"p. 171"},
 {y:"May 1972",t:"Purnima reactor gives the missing data",p:"p. 149"},
 {y:"Sept 1972",t:"Prime minister approves final preparations",p:"pp. 171–172"},
 {y:"March 1973",t:"High-explosive system test-fired without plutonium",p:"p. 172"},
 {y:"Sept 1973",t:"Army begins digging at Pokhran",p:"p. 172"},
 {y:"1973–74",t:"Polonium–beryllium initiator (“Flower”) finally works",p:"p. 173"},
 {y:"Early 1974",t:"Final meetings; Indira Gandhi says go",p:"pp. 174–175"},
 {y:"18 May 1974",t:"Device fired 107 metres underground",p:"p. 178"}
];

DATA.yield74 = [
 {l:"Official figure (Ramanna and Chidambaram, 1975)",a:12,b:12,k:"claim",p:"p. 181"},
 {l:"Sethna on the evening of the test",a:10,b:15,k:"claim",p:"p. 181"},
 {l:"P. K. Iyengar to the author",a:8,b:12,k:"mid",p:"p. 182"},
 {l:"US technical analysts",a:4,b:6,k:"out",p:"p. 182"},
 {l:"Terry Wallace, seismology (1998)",a:0,b:5,k:"out",p:"p. 426"},
 {l:"BARC sources quoted in the press (1981)",a:2,b:2,k:"out",p:"p. 182"}
];
DATA.yield98 = [
 {l:"Official: 12 + 43 + 0.2 kilotons",a:55,b:55,k:"claim",p:"p. 416"},
 {l:"BARC newsletter: 15 + 45 kilotons",a:60,b:60,k:"claim",p:"p. 425"},
 {l:"BARC seismic paper",a:53,b:63,k:"claim",p:"p. 426"},
 {l:"Wallace, first estimate (more likely 20 at most)",a:0,b:30,k:"out",p:"p. 426"},
 {l:"Wallace, detailed paper (Sept 1998)",a:10,b:15,k:"out",p:"p. 426"}
];

DATA.ranges = [
 {l:"Hatf-1 (Pakistan, 1989)",km:80,k:"pak",p:"p. 300"},
 {l:"Prithvi (India, 1988)",km:150,k:"ind",p:"p. 295"},
 {l:"Hatf-2 (Pakistan, 1989)",km:300,k:"pak",p:"p. 300"},
 {l:"Export control line: 500 kg carried 300 km",km:300,k:"rule",p:"p. 300"},
 {l:"Ghauri (Pakistan, 1998), claimed range",km:1500,k:"pak",p:"p. 409"},
 {l:"Agni (India, 1989), reputed range",km:2500,k:"ind",p:"p. 301"}
];

/* From the book’s appendix, pp. 469–471. s: y = safeguarded, n = not, c = conditional */
DATA.facilities = [
 {g:"Power reactors",n:"Tarapur 1 and 2",d:"Light-water, low-enriched uranium, 1969",s:"y"},
 {g:"Power reactors",n:"Rajasthan 1 and 2 (Kota)",d:"Heavy-water, natural uranium, 1972 and 1980",s:"y"},
 {g:"Power reactors",n:"Madras 1 and 2 (Kalpakkam)",d:"Heavy-water, natural uranium, 1983 and 1985",s:"n"},
 {g:"Power reactors",n:"Narora 1 and 2",d:"Heavy-water, natural uranium, 1989 and 1991",s:"n"},
 {g:"Power reactors",n:"Kakrapar 1 and 2",d:"Heavy-water, natural uranium, 1992 and 1995",s:"n"},
 {g:"Power reactors",n:"Kaiga 1 and 2",d:"Heavy-water, under construction in 1998",s:"n"},
 {g:"Power reactors",n:"Koodankulam 1 and 2",d:"Russian light-water reactors, planned",s:"y"},
 {g:"Research reactors",n:"Apsara",d:"Pool type, 1 MW thermal, 1956",s:"n"},
 {g:"Research reactors",n:"CIRUS",d:"Heavy-water, 40 MW thermal, 1960",s:"n"},
 {g:"Research reactors",n:"Dhruva",d:"Heavy-water, 100 MW thermal, 1985",s:"n"},
 {g:"Research reactors",n:"Purnima 1",d:"Fast critical assembly, 1972, decommissioned",s:"n"},
 {g:"Research reactors",n:"Kamini",d:"Uranium-233 fuel, 30 kW, 1996",s:"n"},
 {g:"Breeders",n:"Fast Breeder Test Reactor",d:"Kalpakkam, 40 MW thermal, 1985",s:"n"},
 {g:"Enrichment",n:"Trombay pilot centrifuge plant",d:"1985",s:"n"},
 {g:"Enrichment",n:"Rattehalli (Mysore) centrifuge plant",d:"Pilot scale, 1990",s:"n"},
 {g:"Reprocessing",n:"Trombay (Phoenix)",d:"50 tonnes of fuel a year, 1964, rebuilt 1985",s:"n"},
 {g:"Reprocessing",n:"Tarapur (Prefre)",d:"1977",s:"c"},
 {g:"Reprocessing",n:"Kalpakkam",d:"Laboratory scale 1985; large plant under construction",s:"n"}
];

DATA.regime = [
 {y:"1953",t:"Atoms for Peace",d:"The US shares civil nuclear technology in exchange for peaceful-use pledges. India’s reactors and reprocessing know-how arrive through this door."},
 {y:"1957",t:"IAEA and safeguards",d:"The International Atomic Energy Agency inspects declared facilities and counts nuclear material so that diversion to weapons would be noticed. Safeguards detect; they do not physically prevent."},
 {y:"1963",t:"Partial Test Ban Treaty",d:"Bans tests in the air, in space and under water. India signs at once. Underground tests stay legal, which left the 1974 test lawful (p. 58)."},
 {y:"1968",t:"Non-Proliferation Treaty (NPT)",d:"States that tested before 1 January 1967 are “nuclear weapon states”. Everyone else must forswear weapons and accept safeguards. India calls this discrimination and votes against it in June 1968 (pp. 138, 143)."},
 {y:"1975",t:"Nuclear Suppliers Group",d:"Exporters agree on common controls after Pokhran (p. 191). In 1992 they require full-scope safeguards, meaning inspections on everything a buyer owns (p. 338)."},
 {y:"1976",t:"Symington Amendment",d:"US law: no aid to states that import enrichment or reprocessing technology without full safeguards (p. 198)."},
 {y:"1978",t:"Nuclear Non-Proliferation Act",d:"US law: no nuclear fuel or reactors for states that keep unsafeguarded facilities. It turns the Tarapur fuel contract into a long quarrel, settled in 1982 when France takes over the supply (pp. 206–209, 239)."},
 {y:"1985",t:"Pressler Amendment",d:"Aid to Pakistan requires a yearly presidential certificate that it has no nuclear device (p. 270). Invoked in October 1990 (p. 312)."},
 {y:"1987",t:"Missile Technology Control Regime",d:"Exporters agree not to sell missiles that can carry 500 kilograms more than 300 kilometres, or the parts for them (p. 300)."},
 {y:"1994",t:"Glenn Amendment",d:"Automatic US sanctions on any non-weapon state that detonates a nuclear device (p. 343). Triggered by India and Pakistan in May 1998."},
 {y:"1995",t:"NPT extended indefinitely",d:"The treaty’s two classes of states become permanent (pp. 360–361). India’s negotiator had first spoken of nuclear “apartheid” in 1967 (p. 138). The conference also promises a test ban by 1996, which gives India’s weapon scientists a deadline."},
 {y:"1996",t:"Comprehensive Test Ban Treaty",d:"Bans all nuclear explosions. India objects that it allows subcritical experiments by the established powers, contains no disarmament deadline, and cannot enter into force without India’s ratification (pp. 366, 379)."},
 {y:"1990s",t:"Fissile material cutoff",d:"A proposed treaty to stop making plutonium and enriched uranium for weapons. It would cap arsenals at whatever stock each state already holds (p. 430)."}
];

DATA.chapters = [
 {n:"Intro",yrs:"1947–1998",pm:"",t:"Introduction",
  q:"Why did India build the bomb the way it did, why can it not easily stop, and what difference did the United States make?",
  s:["Opens at Pokhran on 11 May 1998, then sets out three questions that organise the book.","Argues against the standard view that states get the bomb because of security threats alone.","Introduces the “strategic enclave”: the small group of scientists and engineers in the atomic energy and defence research bodies who drove the programme."],
  k:"Read this slowly. Every later chapter is evidence for the argument made here.",tech:[]},
 {n:"1",yrs:"1948–1963",pm:"Nehru",t:"Developing the Technological Base for the Nuclear Option",
  q:"How did a poor new state end up with the means to make plutonium?",
  s:["Nehru and Bhabha build an atomic energy programme answerable only to the prime minister.","Bhabha’s three-stage plan makes plutonium the hinge of India’s energy future.","Canada supplies CIRUS, the US supplies heavy water and reprocessing blueprints, with only loose peaceful-use pledges.","Nehru denounces the bomb in public and keeps the option open in private."],
  k:"The option was built into the civil programme from the start. Nobody had to decide to create it. The motive was modernity and major power standing, with little regard for particular security threats (pp. 15, 59).",tech:["t-fission","t-three","t-reactor","t-reproc"]},
 {n:"2",yrs:"1964",pm:"Nehru, Shastri",t:"The First Compromise Shift toward a “Peaceful Nuclear Explosive”",
  q:"What did India do when China tested?",
  s:["China’s test in October 1964 triggers India’s first open debate.","Bhabha claims that a bomb could be ready in eighteen months and that an explosion would cost very little.","On 27 November Shastri refuses a weapon but endorses study of a peaceful explosive (pp. 82–85)."],
  k:"A security shock produced a compromise shaped by morality, money and one scientist’s salesmanship, not a weapons programme.",tech:["t-pne","t-implosion"]},
 {n:"3",yrs:"Dec 1964–Aug 1965",pm:"Shastri",t:"The Search for Help Abroad and the Emergence of Nonproliferation",
  q:"Could outside powers have made the bomb unnecessary?",
  s:["India seeks security guarantees from the nuclear powers and gets nothing firm.","Bhabha privately asks the US for help with a peaceful explosion.","Washington begins to treat the spread of nuclear weapons as a problem in its own right."],
  k:"The US wanted India not to go nuclear but would not pay the price in guarantees or disarmament.",tech:["t-pne"]},
 {n:"4",yrs:"Aug 1965–May 1966",pm:"Shastri, Indira Gandhi",t:"War and Leadership Transitions at Home",
  q:"What happened when the programme lost its patrons?",
  s:["The 1965 war with Pakistan ends without changing nuclear policy.","Shastri and Bhabha die within two weeks of each other in January 1966.","Sarabhai, the new chairman, opposes nuclear explosions and questions Bhabha’s cost claims."],
  k:"Personalities matter. With different men in charge the programme changed direction overnight.",tech:[]},
 {n:"5",yrs:"1966–1968",pm:"Indira Gandhi",t:"The Nuclear Non-Proliferation Treaty and Secretly Renewed Work on a Nuclear Explosive",
  q:"Why did India reject the treaty it had asked for?",
  s:["India wanted a bargain: no new weapon states in return for disarmament by the existing ones. The NPT gave the first without the second.","India refuses to sign in 1968.","At Trombay, Ramanna’s group quietly starts real design work, beginning with plutonium’s equation of state."],
  k:"The grievance about inequality, fixed in 1968, runs through every later Indian decision up to the test ban.",tech:["t-regime","t-implosion"]},
 {n:"6",yrs:"1969–1971",pm:"Indira Gandhi",t:"Political Tumult and Inattention to the Nuclear Program",
  q:"Who was steering while the politicians looked elsewhere?",
  s:["The Congress party splits and Indira Gandhi fights for survival.","The Trombay group builds the Purnima reactor on no budget and around Sarabhai’s doubts.","Sarabhai’s ten-year profile of May 1970 admits the power programme has slipped badly and scales its targets down (pp. 152–155)."],
  k:"The enclave moved while the political leadership was distracted. Authorisation came after the momentum, not before.",tech:["t-implosion","t-road74"]},
 {n:"7",yrs:"1971–1974",pm:"Indira Gandhi",t:"India Explodes a “Peaceful” Nuclear Device",
  q:"Why 1974, and what was actually achieved?",
  s:["Victory over Pakistan in 1971 improves India’s security, yet the test goes ahead.","Fewer than seventy-five people build the device.","The decision is taken in tiny meetings without the cabinet or the armed forces.","The yield was probably well below the announced twelve kilotons, and the explosion vented radioactivity."],
  k:"This is the central chapter. The test served prestige, the scientists and a prime minister in trouble. It was not part of a military plan. Perkovich’s own sentence: more than any other international consideration, the desire for major power status drove the wish to demonstrate the capability (p. 168).",tech:["t-implosion","t-initiator","t-road74","t-test","t-yield"]},
 {n:"8",yrs:"1975–1980",pm:"Indira Gandhi, Desai, Charan Singh",t:"The Nuclear Program Stalls",
  q:"Why did India not follow the test with weapons?",
  s:["Suppliers form a cartel and US law tightens. Canadian and American supplies dry up.","The Emergency, then the Janata government under Desai, who dislikes the bomb.","Pakistan acquires centrifuge technology through A. Q. Khan.","The nuclear power programme underperforms badly."],
  k:"India paid the price of a test without gaining an arsenal. Restraint was real, and it was partly a matter of leaders’ convictions.",tech:["t-regime","t-safeguards","t-centrifuge"]},
 {n:"9",yrs:"1980–1984",pm:"Indira Gandhi",t:"More Robust Nuclear Policy Is Considered",
  q:"How did India respond to Pakistan’s progress?",
  s:["A strike on Kahuta is studied and dropped.","A second test is approved and cancelled within a day.","The missile programme is launched in 1983.","Heavy water is bought secretly abroad to keep reactors going."],
  k:"India hedged: more capability, no declared policy.",tech:["t-delivery","t-reactor","t-test"]},
 {n:"10",yrs:"Nov 1984–Dec 1987",pm:"Rajiv Gandhi",t:"Nuclear Capabilities Grow and Policy Ambivalence Remains",
  q:"What did a moderniser who disliked nuclear weapons do with them?",
  s:["Dhruva starts up, giving more unsafeguarded plutonium.","Designers work on smaller devices, boosting and better initiators.","The Brasstacks exercise brings India and Pakistan close to war.","An informal committee sketches a minimum deterrent with no first use."],
  k:"Capability advanced under a prime minister who campaigned for disarmament. The gap between what India could do and what it said widened.",tech:["t-boost","t-initiator","t-doctrine"]},
 {n:"11",yrs:"1988–1990",pm:"Rajiv Gandhi, V. P. Singh",t:"The Nuclear Threat Grows Amid Political Uncertainty",
  q:"When did India actually get usable weapons?",
  s:["Rajiv’s disarmament plan is ignored at the UN.","Prithvi and Agni fly.","By one account about two dozen weapons are made ready for assembly and delivery by aircraft.","The 1990 Kashmir crisis; the US cuts aid to Pakistan."],
  k:"Both countries now had bombs in the basement. Neither admitted it.",tech:["t-delivery","t-doctrine","t-ladder"]},
 {n:"12",yrs:"1991–1994",pm:"Chandra Shekhar, Rao",t:"American Nonproliferation Initiatives Flounder",
  q:"Why could Washington not cap or roll back the two programmes?",
  s:["The US proposes regional talks and a freeze. India will not accept limits that leave China out.","Economic reform makes India more exposed to sanctions, and more confident.","Weapon designs for aircraft and missiles are completed."],
  k:"American policy treated India as half of a regional problem. India saw itself as a major power facing a discriminatory order.",tech:["t-regime","t-doctrine"]},
 {n:"13",yrs:"1995–May 1996",pm:"Rao, Vajpayee",t:"India Verges on Nuclear Tests",
  q:"Why did India come so close in 1995 and 1996?",
  s:["The NPT is made permanent and a test ban looms.","Scientists argue that the option cannot be kept alive without tests.","US satellites catch the preparations. Rao holds back.","Vajpayee orders tests in his twelve days in office and then pauses them."],
  k:"The treaties meant to stop testing gave Indian hawks a deadline.",tech:["t-test","t-boost","t-regime"]},
 {n:"14",yrs:"June 1996–Dec 1997",pm:"Deve Gowda, Gujral",t:"India Rejects the CTBT",
  q:"How did a treaty India first proposed in 1954 become unacceptable?",
  s:["India blocks the test ban at Geneva.","The entry-into-force clause is read as coercion.","Deve Gowda puts the scientists off and Gujral declines to test. Gujral seeks better relations with Pakistan."],
  k:"Opposing the treaty became a test of national pride, which made it very hard for any government to sign.",tech:["t-regime"]},
 {n:"15",yrs:"1998",pm:"Vajpayee",t:"The Bombs That Roared",
  q:"Who decided, what was tested, and did it work?",
  s:["A few BJP leaders decide without wider consultation.","Five tests are announced: a fission device, a claimed hydrogen bomb and three small ones.","Outside analysts doubt the yields and think the hydrogen bomb’s second stage failed.","One device probably used plutonium that was not weapon-grade.","Pakistan replies within three weeks."],
  k:"The technical claims deserve the same scepticism as Bhabha’s in 1964. Politically the tests ended ambiguity without supplying a doctrine. Perkovich lists seven aims of the tests, beginning with recognition as a major power and catching up with China in status, and judges that the wish for standing and autonomy explains them better than any specific security need (pp. 439, 441).",tech:["t-test","t-yield","t-boost","t-reactor","t-initiator"]},
 {n:"Concl.",yrs:"",pm:"",t:"Conclusion: Exploded Illusions of the Nuclear Age",
  q:"What does India’s case teach about proliferation in general?",
  s:["Illusion 1: security concerns decisively determine proliferation. Domestic factors and personalities mattered at least as much (p. 446).","Illusion 2: nonproliferation is the flip side of proliferation. Removing the original cause does not undo a programme (p. 455).","Illusion 3: democracy helps nonproliferation. In India open politics made rollback harder (p. 459).","Illusion 4: equitable disarmament is unnecessary. A few states cannot keep their weapons for ever and expect others to abstain (p. 464)."],
  k:"For a status-centred reading of India, this is the chapter to cite. It names six factors besides insecurity. Two pushed India towards the bomb: the interest in major power status and the strategic enclave. Four held it back: the norm of moral superiority, the lack of institutions that gave the military a voice, economic limits, and international pressure (p. 452).",tech:[]}
];

DATA.people = [
 {g:"Scientists",n:"Homi J. Bhabha",r:"Founder; AEC chairman 1948–66",d:"Physicist, close to Nehru. Built the establishment, sold the three-stage plan, and overstated how fast a bomb could be made."},
 {g:"Scientists",n:"Vikram Sarabhai",r:"AEC chairman 1966–71",d:"Founder of the space programme. Doubted the worth of nuclear explosions. His subordinates worked around him."},
 {g:"Scientists",n:"Homi Sethna",r:"BARC director; AEC chairman 1972–83",d:"Chemical engineer. Built the plutonium plant, backed the device team, announced the 1974 test."},
 {g:"Scientists",n:"Raja Ramanna",r:"Led the 1974 device team; later AEC chairman",d:"Physicist and pianist, trusted by Indira Gandhi. The key link between scientists and prime minister."},
 {g:"Scientists",n:"P. K. Iyengar",r:"Experimental physicist; AEC chairman 1990–93",d:"Ran Purnima and the initiator work. Candid with Perkovich about the 1974 yield."},
 {g:"Scientists",n:"R. Chidambaram",r:"Designer; AEC chairman from 1993",d:"Worked out plutonium’s equation of state in 1968. Presided over the 1998 tests."},
 {g:"Scientists",n:"B. D. Nag Chaudhuri",r:"Defence science adviser, early 1970s",d:"Brought the defence laboratories and their explosives expertise into the 1974 project."},
 {g:"Scientists",n:"V. S. Arunachalam",r:"Defence science adviser 1982–92",d:"Metallurgist. Oversaw the missile programme and the work on smaller devices."},
 {g:"Scientists",n:"A. P. J. Abdul Kalam",r:"Missile programme head; defence science adviser from 1992",d:"From SLV-3 to Prithvi and Agni. Co-led the 1998 tests with Chidambaram."},
 {g:"Scientists",n:"Anil Kakodkar, S. K. Sikka, K. Santhanam",r:"1998 test team",d:"BARC and DRDO leaders who designed and fielded the devices."},
 {g:"Advisers and strategists",n:"P. N. Haksar",r:"Indira Gandhi’s principal secretary",d:"Warned in 1974 that the time was not ripe."},
 {g:"Advisers and strategists",n:"K. Subrahmanyam",r:"Strategic analyst",d:"The most persistent public advocate of an Indian deterrent."},
 {g:"Advisers and strategists",n:"General K. Sundarji",r:"Army chief 1986–88",d:"Thought through nuclear doctrine, led Brasstacks, argued for minimum deterrence."},
 {g:"Advisers and strategists",n:"Arun Singh",r:"Minister of state for defence 1986–87",d:"Tried to bring the military into strategic planning. Recalled as an adviser in 1990."},
 {g:"Advisers and strategists",n:"Brajesh Mishra",r:"Vajpayee’s principal secretary",d:"At the centre of the 1998 decision."},
 {g:"Pakistan",n:"Zulfikar Ali Bhutto",r:"President, then PM 1971–77",d:"Launched the bomb effort in January 1972."},
 {g:"Pakistan",n:"Munir Ahmad Khan",r:"Chairman, Pakistan AEC",d:"Pursued the plutonium route and a French reprocessing plant."},
 {g:"Pakistan",n:"A. Q. Khan",r:"Head of the Kahuta enrichment project",d:"Metallurgist who brought centrifuge designs from Europe and built the uranium route."},
 {g:"Pakistan",n:"Zia ul-Haq",r:"Military ruler 1977–88",d:"Kept the programme going under cover of the Afghan war alliance with Washington."}
];

DATA.pmcards = [
 {n:"Jawaharlal Nehru",y:"1947–64",v:"build",h:"Builds the base, keeps the option",d:"Moral opponent of the bomb in public. In private he wants India able to make one if it must. Gives Bhabha money, secrecy and direct access.",sci:"Bhabha"},
 {n:"Lal Bahadur Shastri",y:"1964–66",v:"hold",h:"Refuses a bomb, allows a “peaceful explosive”",d:"Faces China’s test and a clamour in Parliament. Finds a formula that concedes study of an explosive without abandoning Gandhi.",sci:"Bhabha"},
 {n:"Indira Gandhi (first term)",y:"1966–77",v:"go",h:"Rejects the NPT, tests in 1974, then stops",d:"Lets the scientists proceed, approves the test in small secret meetings, and afterwards declines to build weapons.",sci:"Sarabhai, Sethna, Ramanna, Iyengar, Chidambaram"},
 {n:"Morarji Desai",y:"1977–79",v:"stop",h:"Personal opposition",d:"Tells the American ambassador he will never develop a bomb. The weapon work marks time while he is in office.",sci:"Sethna"},
 {n:"Indira Gandhi (second term)",y:"1980–84",v:"build",h:"Revives the work, cancels a test",d:"Brings Ramanna back, approves and withdraws a second test in a day, and starts the missile programme.",sci:"Ramanna, Arunachalam, Kalam"},
 {n:"Rajiv Gandhi",y:"1984–89",v:"build",h:"Disarmer who authorised weaponisation",d:"Campaigns abroad for abolition. When that fails and Pakistan advances, he approves the steps that produce ready-to-assemble weapons.",sci:"Arunachalam, Ramanna, Iyengar, Chidambaram, Kalam"},
 {n:"V. P. Singh and Chandra Shekhar",y:"1989–91",v:"hold",h:"Crisis managers",d:"Weak coalitions. The 1990 Kashmir crisis is handled; the capability is neither announced nor reduced.",sci:"Arunachalam, Iyengar"},
 {n:"P. V. Narasimha Rao",y:"1991–96",v:"hold",h:"Prepares, hesitates, holds back",d:"Lets the weapon designs be completed and the test site readied. Puts the economy first when the preparations are exposed.",sci:"Chidambaram, Kalam"},
 {n:"Deve Gowda and I. K. Gujral",y:"1996–98",v:"stop",h:"Reject the test ban, do not test",d:"Both refuse the CTBT. Gowda puts the scientists off; Gujral says no. Gujral believes India’s interests lie in diplomacy with its neighbours.",sci:"Chidambaram, Kalam"},
 {n:"Atal Bihari Vajpayee",y:"1996, 1998–",v:"go",h:"Says yes",d:"Leads the first ruling party that wants the bomb openly. Orders tests in 1996 and retracts; orders them again in 1998 and carries them through.",sci:"Chidambaram, Kalam, Kakodkar, Santhanam"}
];

DATA.glossary = [
 ["Fission","Splitting a heavy nucleus (uranium-235, plutonium-239) with a neutron. Releases energy and two or three more neutrons."],
 ["Chain reaction","Each fission causes at least one more. Steady in a reactor, runaway in a bomb."],
 ["Critical mass","The smallest amount of fissile material, in a given shape and density, that sustains a chain reaction. Squeeze the metal and less is needed."],
 ["Fissile material","Material that can sustain a chain reaction: highly enriched uranium, plutonium, uranium-233."],
 ["Natural uranium","Uranium as mined: about 0.7 per cent uranium-235, the rest uranium-238."],
 ["Enrichment","Raising the share of uranium-235. A few per cent for power reactors, about ninety per cent for weapons."],
 ["Centrifuge","A fast-spinning tube that separates uranium isotopes by weight. Pakistan’s route to the bomb."],
 ["Heavy water","Water whose hydrogen is deuterium. It slows neutrons without absorbing many, so a reactor can run on natural uranium."],
 ["Moderator","The material in a reactor that slows neutrons so that they cause more fissions."],
 ["Plutonium","A man-made element formed when uranium-238 absorbs a neutron in a reactor. India’s bomb material."],
 ["Weapon-grade plutonium","More than 93 per cent plutonium-239 (p. 428). Made by taking fuel out of the reactor early."],
 ["Reactor-grade plutonium","Plutonium from fuel left in a power reactor for a long time: only 65 to 70 per cent plutonium-239 (p. 428). Harder to use, but usable."],
 ["Reprocessing","Chemically separating plutonium from used reactor fuel. Purex is the standard process."],
 ["Safeguards","IAEA inspection and accounting to check that nuclear material is not diverted to weapons."],
 ["Full-scope safeguards","Safeguards on every nuclear facility a state has. What India always refused."],
 ["Breeder reactor","A reactor that makes more fissile fuel than it burns."],
 ["Thorium","A common element in Indian beach sands. Not fissile itself, but turns into fissile uranium-233 in a reactor."],
 ["Implosion","Squeezing a ball of plutonium with shaped chemical explosives until it becomes supercritical."],
 ["Equation of state","The relation between a material’s pressure, density and temperature. Needed to calculate how plutonium behaves when crushed."],
 ["Initiator","A tiny neutron source at the centre of the core that starts the chain reaction at the right instant."],
 ["Half-life","The time in which half of a radioactive substance decays. Polonium-210: 138 days."],
 ["Kiloton","Explosive energy equal to a thousand tonnes of TNT."],
 ["Yield","The energy a nuclear explosion releases."],
 ["Venting","Leakage of radioactive gas from an underground test to the surface."],
 ["Peaceful nuclear explosion (PNE)","A nuclear explosion for civil engineering, such as digging canals. Physically the same as a bomb test."],
 ["Plowshare","The US programme of peaceful nuclear explosions that gave the idea respectability."],
 ["Levitation","Leaving a gap between the core and what drives it, so the implosion hits harder (p. 272)."],
 ["Boosted fission","Adding deuterium and tritium gas to a fission core. Their fusion floods the core with neutrons and raises the yield (p. 272)."],
 ["Tritium","Heavy radioactive hydrogen. Made in reactors, used for boosting."],
 ["Thermonuclear weapon","A two-stage hydrogen bomb: a fission “primary” ignites a fusion “secondary”."],
 ["Lithium-6 deuteride","The solid fusion fuel of a hydrogen bomb (p. 427)."],
 ["Subcritical test","An experiment with nuclear material and explosives that stops short of a chain reaction. Allowed under the test ban."],
 ["Re-entry vehicle","The shielded cone that carries a warhead back down through the atmosphere."],
 ["Toss-bombing","A pilot pulls up and releases the bomb in a climb so that it flies on while the aircraft turns away (p. 295)."],
 ["Strategic enclave","Perkovich’s term, borrowed from Itty Abraham, for the scientists and engineers of the atomic energy and defence research bodies who steered the programme."],
 ["Nuclear option","Having the means to build weapons quickly while declaring no intention to do so. India’s policy for most of the period."],
 ["Recessed deterrence","Weapons kept as separated components under civilian control, not deployed with the armed forces (p. 349)."],
 ["Minimum deterrence","A small force meant only to retaliate after a nuclear attack."],
 ["No first use","A pledge never to be the first to use nuclear weapons."],
 ["Command and control","The people, procedures and communications that decide when and whether weapons are used."]
];
