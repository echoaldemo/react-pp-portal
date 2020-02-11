export default (name, uuid) => {
  const randomId = Math.floor(Math.random() * (3000 - 1000) + 10);
  return {
    id: String(randomId),
    name: name,
    uuid: uuid,
    longTransfer: 30,
    closeLead: "Transfer",
    closeDuration: 4,
    revenue: "5",
    setLongTransfers: true,
    repostRules: "allow",
    leads: "us63dnw",
    CPS: "0",
    progress: "1.00",
    numbers: "-",
    delivery: "0%",
    status: "Paused",
    onTransfer: "0",
    timestamp: "2017-03-31 09:30:20-07",
    voiceSched: false,
    amd: true,
    numberList_id: "2",
    localMatch: true,
    leadsPerDay: "25",
    delType: "1",
    transfers: "675",
    maxCPS: 0.75,
    callsms: [
      {
        id: 0,
        name: "Inbound open hours",
        maxEvents: 1,
        totalEvents: 0,
        events: []
      },
      {
        id: 1,
        name: "Inbound off hours",
        maxEvents: 2,
        totalEvents: 0,
        events: []
      },
      {
        id: 2,
        name: "Outbound live",
        maxEvents: 3,
        totalEvents: 0,
        events: []
      },
      {
        id: 3,
        name: "Schedule call",
        maxEvents: 3,
        totalEvents: 0,
        events: []
      }
    ],
    recordCalls: false,
    fallbackTransfer: true,
    fallbackTimeOut: "12",
    fallbackNumber: "23",
    aiRules: "2",
    numberList: "3",
    maxCps: "570",
    activeLeads: 1.1,
    liveCalls: 0.6,
    outboundCalls: 0.6,
    smsReceived: 100,
    smsSent: 1.002,
    days: [
      {
        "0": {
          Day: "Monday",
          Open: "22:00",
          Close: "19:20",
          Active: true
        },
        "1": {
          Day: "Tuesday",
          Open: "11:45",
          Close: "18:30",
          Active: true
        },
        "2": {
          Day: "Wednesday",
          Open: "10:45",
          Close: "17:30",
          Active: false
        },
        "3": {
          Day: "Thursday",
          Open: "08:00",
          Close: "17:00",
          Active: true
        },
        "4": {
          Day: "Friday",
          Open: "08:00",
          Close: "17:00",
          Active: false
        },
        "5": {
          Day: "Saturday",
          Open: "08:00",
          Close: "17:00",
          Active: false
        },
        "6": {
          Day: "Sunday",
          Open: "08:00",
          Close: "17:00",
          Active: false
        }
      }
    ]
  };
};
