# "Document Links" with APL 1.4 

Coming with APL 1.4 it is now possible to host documents right from where you saved them in the Developer Console when using the **APL authoring tool**. You find this new feature documented here:
https://developer.amazon.com/en-US/docs/alexa/alexa-presentation-language/apl-latest-version.html#use-document-links-in-renderdocument

Playing around with this feature I made some findings which I like to share with you:

## Disclaimer

What I document here has been tried and tested on an Alexa hosted skill for locale "de-DE" and the Developer Test Console in the browser. As we all know: real devices and other locales may behave differently. This is especially true for APL.


## How to make document links work from your code

Within the Developer Console under the "**Build**" tab select "**Multimodal Responses**". Then select "**Visual**".

Create your APL in the APL Authoring Tool and save it under a name e.g. "**some-apl-template-name**". 

Later on you will be able to handle multiple APLs with different names and even clone one document to serve as starter for updates.

Now in your code use this key "**some-apl-template-name**" to refer to the template:

    return handlerInput.responseBuilder
      .addDirective({
        type: "Alexa.Presentation.APL.RenderDocument",
        token: "someToken",
        document: {
          src: "doc://alexa/apl/documents/some-apl-template-name",
          type: "Link",
        },
        datasources: {},
        packages: [],
      })
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
    }

Make sure to build your model and deploy the code.

This should be enough to make the template visible.

## When things go wrong

In case the skill cannot access the APL template because of an malformed document URI Alexa will read an error message about some bad URI. In German this sounds as follows: "**Die für den angegebenen Skill konfigurierte URI ist nicht gültig**". 

I appreciate that this is a **much better error message** compared to an audible "beep" which we all hear so often under other circumstances when a skill runs into problems. 


## Changing and redeploying your APL 

When changing the APL in the authoring tool it appeared to me that pressing "**Save Template**" (Floppy disc icon in the upper right corner) was not enough to make changes visible for the skill. Maybe I did not wait long enough? Not sure. 

What did work definitely in my experiments was to retrigger a "**Build Model**". After doing this I always saw my changes.

## Working from the command line (ask V2)

What happens when you clone your skill using ask V2? 

    ask init --hosted-skill-id <some-hosted-skill-id>

It works: luckily you will find JSON artifacts for your templates within the folder "**skill-package**". 

You can work on these artifacts using Visual Studio Code or your preferred editor and after deploying them using a "**git push**" this will make your changes visible to your skill code. 

**Watch out**: Again deployment  takes some time and it would be handy to have some feedback on the command line that deployment is complete.

**By the way**: after a fresh clone the JSON files turned out to be long unformatted one liners. But after reformating them with a pretty printer I had no problems to proceed working on them.


## How about ask V1?

Did not try this yet but I would not expect this to work ...

## Keep your development environment in sync and clean

When you decide to work on the APLs from your local workspace **be warned** that then changing template names or even the APL contents from the Developer Console with the APL Authoring Tool may cause your git branches to get **out of sync**. 

Manual git merges between master and dev branches may be necessary to fix such a situation. 

This is why I try to avoid such a scenario. 




