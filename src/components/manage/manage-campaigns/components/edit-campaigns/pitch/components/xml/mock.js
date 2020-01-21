export const currentData = `<pitch>
  <globals>
    <options>
      <!--Pitch Segment [options] Gatekeeper Issue Options (bffb6fb6-5c24-11e7-8a24-02420a000909)-->
      <opt key-combo="CTRL-M" name="Prospect cannot hear">
        <hashtag tags="prospectcannothear"/>
      </opt>
      <opt key-combo="CTRL-ALT-M" name="Bad Audio">
        <hashtag tags="badaudio"/>
      </opt>
      <opt key-combo="CTRL-SHIFT-M" name="No Audio">
        <hashtag tags="noaudio"/>
      </opt>
      <opt key-combo="CTRL-ALT-C" name="Call Can't Save">
        <hashtag tags="callcantsave"/>
      </opt>
      <opt key-combo="CTRL-SHIFT-L" name="No Bowout">
        <hashtag tags="nobowout"/>
      </opt>
      <opt key-combo="CTRL-ALT-L" name="Stuck">
        <hashtag tags="stuck"/>
      </opt>
      <!--Pitch Segment [options] Standard Options (7db931ba-5c24-11e7-9c4e-02420a000909)-->
      <!-- Standard options -->
      <!-- alt+a -->
      <opt key-combo="ALT-A" name="ITERATE: iterate the current iterable">
        <iterate/>
      </opt>
      <!-- alt+z -->
      <opt key-combo="ALT-Z" name="PREVIOUS: return to previous node">
        <previous-node/>
      </opt>
      <opt key-combo="ALT-1" name="END do not call">
        <set-var location="pitch" name="Last Iterated Key" value="DNC"/>
        <set-widget-value widget="prospect.disposition_combo" value="40810"/>
        <audio namespace="gk" key="end-do-not-call">Okay, sorry about that. We'll take your number off our list. Have a nice day. Good bye.</audio>
        <iterate key="usell_error-logging"/>
        <wait milliseconds="1000"/>
        <hangup save-and-close="1"/>
      </opt>
    </options>
  </globals>
  <nodes><!--Pitch Segment [nodes] Rapid Response Intro (affb02a8-94da-11e8-bbb5-0242ac110002)--><node id="rr_intro"><auto><declare-iterable default="1" key="rr_intro_1" loop="all"><audio namespace="RapidResponse" key="rr_intro_1_hello">Hi, I'm calling with Perfect Pitch Tech. I'd love to demonstrate our new Rapid Response technology. Do you have some time to hear a demo?</audio><audio namespace="RapidResponse" key="rr_intro_3_hello">Again, I'm calling with Perfect Pitch Tech. I'd love to demonstrate our new Rapid Response technology. Do you have some time to hear a demo?</audio></declare-iterable><iterate key="rr_intro_1"/></auto><options><opt key-combo="F1" name="Next"><goto node="rr_info"/></opt></options></node><node id="rr_info"><auto><declare-iterable default="1" key="rr_info_1" loop="all"><audio namespace="RapidResponse" key="rr_info_1_about">Rapid Response is a technology used to tests reps profiency at using the Perfect Pitch Platform</audio></declare-iterable><iterate key="rr_info_1"/></auto><options><opt key-combo="F1" name="Next"><goto node="rr_demo"/></opt></options></node><node id="rr_demo"><auto><declare-iterable default="1" key="rr_demo_1"><audio namespace="RapidResponse" key="rr_demo_1_confirm">Are you ready to hear a demo of Rapid Response?</audio></declare-iterable><iterate key="rr_demo_1"/></auto></node><!--Pitch Segment [nodes] sample v4 (4885f928-e10c-11e9-8817-0242ac110005)--><node id="rr_intro">↵    <auto>↵      <declare-iterable default="1" key="rr_intro_1" loop="all">↵        <audio namespace="RapidResponse" key="rr_intro_1_hello">Hi, I'm calling with Perfect Pitch Tech. I'd love to demonstrate our new Rapid Response technology. Do you have some time to hear a demo?</audio>↵        <audio namespace="RapidResponse" key="rr_intro_3_hello">Again, I'm calling with Perfect Pitch Tech. I'd love to demonstrate our new Rapid Response technology. Do you have some time to hear a demo?</audio>↵      </declare-iterable>↵      <iterate key="rr_intro_1"/>↵    </auto>↵    <options>↵      <opt key-combo="F1" name="Next">↵        <goto node="rr_info"/>↵      </opt>↵    </options>↵  </node>↵  <node id="rr_info">↵    <auto>↵      <declare-iterable default="1" key="rr_info_1" loop="all">↵        <audio namespace="RapidResponse" key="rr_info_1_about">Rapid Response is a technology used to tests reps profiency at using the Perfect Pitch Platform</audio>↵      </declare-iterable>↵      <iterate key="rr_info_1"/>↵    </auto>↵    <options>↵      <opt key-combo="F1" name="Next">↵        <goto node="rr_demo"/>↵      </opt>↵    </options>↵  </node>↵  <node id="rr_demo">↵    <auto>↵      <declare-iterable default="1" key="rr_demo_1">↵        <audio namespace="RapidResponse" key="rr_demo_1_confirm">Are you ready to hear a demo of Rapid Response?</audio>↵      </declare-iterable>↵      <iterate key="rr_demo_1"/>↵    </auto>↵  </node>↵</nodes>
  <rapid-response-tests>
    <!--Rapid Response Test RapidResponseTest object (1cdd3de4-94e2-11e8-ba4d-0242ac11000f)-->
    <rapid-response-test uuid="1cdd3de4-94e2-11e8-ba4d-0242ac11000f" name="Hello-Intro">
      <voices>
        <voice uuid="346516de-5aa6-11e7-88db-02420aff0012" username="ahayterVoice" first_name="aodhan-voice" last_name="hayter"/>
        <voice uuid="91dd2102-9283-11e7-a3d8-02420aff0015" username="newVoice" first_name="New" last_name="Voice"/>
      </voices>
      <intro>
        <prospect-audio namespace="prospect" key="hello-1">Hello</prospect-audio>
      </intro>
      <ending/>
      <response-test node="rr_intro">
        <prospect-audio namespace="gk" key="dnc">I'm not interested.  Put me on your do not call list.</prospect-audio>
        <grading>
          <key-press key-combo="ALT-1" grade="100" fail="False"/>
        </grading>
      </response-test>
      <failure>
        <prospect-audio namespace="prospect" key="fail-1">Never call me again!!!</prospect-audio>
      </failure>
      <no-response>
        <prospect-audio namespace="prospect" key="no-res-hello">Helloooooooo</prospect-audio>
      </no-response>
    </rapid-response-test>
    <!--Rapid Response Test RapidResponseTest object (94991b5e-7a26-11e8-98cf-0242ac110016)-->
    <rapid-response-test uuid="94991b5e-7a26-11e8-98cf-0242ac110016" name="DNC Test" final_revenue="1.0">
      <setup-prospect-tts-polly voice="Random"/>
      <voices>
        <voice uuid="346516de-5aa6-11e7-88db-02420aff0012" username="ahayterVoice" first_name="aodhan-voice" last_name="hayter"/>
        <voice uuid="91dd2102-9283-11e7-a3d8-02420aff0015" username="newVoice" first_name="New" last_name="Voice"/>
        <voice uuid="f55f5ace-a93f-11e7-8740-0242ac110008" username="voice-user" first_name="Voice" last_name="User"/>
      </voices>
      <intro>
        <prospect-audio namespace="prospect" key="intro-1">{{prospect.first_name}} speaking</prospect-audio>
        <prospect-audio namespace="prospect" key="intro-2">Hello this is {{prospect.first_name}}</prospect-audio>
        <prospect-audio namespace="prospect" key="intro-3">Hey, this is {{prospect.first_name}}</prospect-audio>
      </intro>
      <ending>
        <prospect-audio namespace="prospect" key="failure-1">Ok, but I need to hang up, bye</prospect-audio>
        <prospect-audio namespace="prospect" key="failure-2">
        Ok, thanks for the info but getting on the elevator. bye
    </prospect-audio>
      </ending>
      <response-test node="rr_intro">
        <prospect-audio namespace="gk" key="dnc">I'm not interested.  Put me on your do not call list.</prospect-audio>
        <grading>
          <key-press key-combo="ALT-1" grade="100" fail="False"/>
        </grading>
      </response-test>
      <failure>
        <prospect-audio namespace="prospect" key="failure-1">I don't have time for this!</prospect-audio>
        <prospect-audio namespace="prospect" key="failure-2">
        Sorry, getting on the elevator. I will call back, I promise.
    </prospect-audio>
        <prospect-audio namespace="prospect" key="failure-3">You guys suck, stop calling me!</prospect-audio>
      </failure>
      <no-response>
        <prospect-audio namespace="prospect" key="failure-1">Hello, are you still there?</prospect-audio>
        <prospect-audio namespace="prospect" key="failure-2">Hello? Helloooo?</prospect-audio>
        <prospect-audio namespace="prospect" key="failure-3">Uhhhh, herro?</prospect-audio>
      </no-response>
    </rapid-response-test>
  </rapid-response-tests>
</pitch>`;

export const pitch_details = {
  uuid: "164695b6-91d6-11e8-9d85-0242ac11000a",
  name: "Rapid name",
  segments: [
    { committed: true, uuid: "bffb6fb6-5c24-11e7-8a24-02420a000909" },
    { committed: true, uuid: "affb02a8-94da-11e8-bbb5-0242ac110002" },
    { committed: true, uuid: "4885f928-e10c-11e9-8817-0242ac110005" },
    { committed: false, uuid: "dec1a3e6-56a9-11e7-b841-02420a000908" }
  ],
  voices: ["c4d8bac6-fab4-11e9-981d-0242ac110014"],
  rapid_response_tests: ["94991b5e-7a26-11e8-98cf-0242ac110016"],
  versions: [
    {
      uuid: "25f56242-e4c0-11e9-9e34-0242ac110004",
      pitch: "164695b6-91d6-11e8-9d85-0242ac11000a",
      version: 37,
      committed_by: "8ae6d97e-9786-11e9-a313-0242ac110012",
      num_audio: 9,
      num_prospect_audio: 16
    },
    {
      uuid: "774bd658-e4c0-11e9-bbd7-0242ac110004",
      pitch: "164695b6-91d6-11e8-9d85-0242ac11000a",
      version: 38,
      committed_by: "8ae6d97e-9786-11e9-a313-0242ac110012",
      num_audio: 9,
      num_prospect_audio: 16
    },
    {
      uuid: "2b9f0860-e4de-11e9-b36c-0242ac110005",
      pitch: "164695b6-91d6-11e8-9d85-0242ac11000a",
      version: 39,
      committed_by: "8ae6d97e-9786-11e9-a313-0242ac110012",
      num_audio: 9,
      num_prospect_audio: 16
    }
  ],
  phrase_books: [],
  panel: "edu",
  committed: false,
  active_version: "25f56242-e4c0-11e9-9e34-0242ac110004",
  variables: {
    test: "1",
    test1: "valtest",
    KeyVal: "ValKey",
    fastKey: "ValKey",
    testKey: "testVal",
    rapidKey: "rapidVal",
    gk_donotcall: "40810"
  },
  company: "60a7501c-91ce-11e8-9ab8-0242ac11000d",
  campaign: "7ae4e6ce-91ce-11e8-b064-0242ac11000d"
};

export const company_slug_val = "rapid";
export const campaign_slug_val = "rapid-response";

export const ccd = {
  uuid: "7ae4e6ce-91ce-11e8-b064-0242ac11000d",
  realms: [
    "f2f504d6-09d6-11e7-8b04-52540018307b",
    "847a624a-a6a4-11e9-ac77-0242ac110012"
  ],
  company: "60a7501c-91ce-11e8-9ab8-0242ac11000d",
  dialingparams: null,
  queue: null,
  warmtransfer: null,
  callback: null,
  slug: "rapid-response",
  name: "Rapid Response",
  active: true,
  archived: false
};
