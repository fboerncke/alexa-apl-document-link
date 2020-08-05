# "Document Links" with APL 1.4 

Coming with APL 1.4 it is now possible to host both APLA and APLA documents right from where you created and saved them in the Developer Console. 

You find this new feature documented here:
https://developer.amazon.com/en-US/docs/alexa/alexa-presentation-language/apl-latest-version.html#use-document-links-in-renderdocument

Playing around with this feature I made some findings which I like to share with you:

## Disclaimer

What I document here has been tried and tested on an Alexa hosted skill for locale "en-US" and the Developer Test Console in the browser. As we all know: real devices and other locales may behave differently. This is especially true for APL.


## Creating APL and APLA documents


### APL documents

Within the Developer Console under the "**Build**" tab select "**Multimodal Responses**". Then select "**Visual**".

Create your APL in the **APL Authoring Tool** and save it under a name e.g. "**some-apl-template-name**". 

Later on you will be able to handle multiple APLs with different names and even clone one document to serve as starter for updates.

**Important**: under tab "Interfaces" activate the option "Alexa Presentation Language". If you forget this your skill will return with an error.

### APLA documents

Within the Developer Console under the "**Build**" tab select "**Multimodal Responses**". Then select "**Audio**". Proceed with "Create Audio Response".

Create and Test your APLA document here and save it under a name e.g. "**some-apla-template-name**". 

Later on you will be able to handle multiple APLA files with different names and even clone one document to serve as starter for updates or new experiments.

APLA is not restricted to screen based devices. It will also work on an Echo Dot. Furthermore - different from APL - it is not necessary to activate some interface to make APLA work.

### Make changes visible

Make sure to build your model before you proceed. This is also true when you make changes to the documents.

## How to make document links work from your code

Now use the filenames "**some-apl-template-name**" and "**some-apla-template-name**" as keys in your code to refer to the template:

        return handlerInput.responseBuilder
    // here comes the APL reference
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
    // here comes the APLA reference
    // we hear this right after(!) the utterance defined in ".speak(...)" further below
      .addDirective({
        type: "Alexa.Presentation.APLA.RenderDocument",
        token: "someToken",
        document: {
          src: "doc://alexa/apla/documents/some-apla-template-name",
          type: "Link",
        },
        datasources: {},
        packages: [],
      })
      .speak("Say hello to Document Links!") // we here this utterance before the APLA!
      .getResponse();
  },
};

You can see a number of things going on here:

- You can return an APL and an APLA within the same response 
- You have two options to return speech: 
  1. use an APLA document
  2. "speak(...)" method in the responseBuilder

  In case you use both options the utterance defined with "speak(...)" will be heard first 

- Don't mix up the types for the directives, they look very similar:
  - for APL use type "Alexa.Presentation.APL.RenderDocument"
  - for APLA use type "Alexa.Presentation.APLA.RenderDocument"

Make sure to save and deploy your code.

This should be enough to make the template visible.

## Testing

Before you proceed make sure testing is enabled in the **Test** tab.

## When things go wrong

In case the skill cannot access the APL template because of an malformed document URI Alexa will read an error message about some bad URI: 

- In English it sounds "**The U.R.I. configured for the specified skill is not valid**"
- In German it sounds as follows: "**Die für den angegebenen Skill konfigurierte URI ist nicht gültig**"

I appreciate that this is a **much better error message** compared to an audible "beep" which we all hear so often under other circumstances when a skill runs into problems. 


## Changing and redeploying your APL / APLA

When changing the APL in the authoring tool it appeared to me that pressing "**Save Template**" (Floppy disc icon in the upper right corner) was not enough to make changes visible for the skill. Maybe I did not wait long enough? Not sure. 

What did work definitely in my experiments was to retrigger a "**Build Model**". After doing this I always saw my changes.

For APLA the docs say clearly: 

> Update your skill to use a linked document

> After creating the APLA document in the authoring tool, you must build your skill in the the Alexa developer console to activate the reference. You must also rebuild the skill if you edit and save the reference doc for the changes to go live in production.

However I did not find such a remark regarding APL when using document links.



## Working from the command line (ask V2)

What happens when you clone your skill using ask V2? 

    ask init --hosted-skill-id <some-hosted-skill-id>

It works: luckily you will find JSON artifacts for both your APL and APLA templates within the folder "**skill-package**". I cloned the **complete folder structure** to this github project so you can explore the result yourself.

You will see that after a fresh clone the JSON files turn out to be long unformatted one liners. 

But after reformating them with a pretty printer I had no problems to proceed working on them. In fact you can work on these artifacts using Visual Studio Code or your preferred editor and after deploying them using a "**git push**" this will make your changes visible to your skill code. 

**Watch out**: Unfortunately deployment takes some time and it would be handy to have some feedback on the command line that deployment is complete.

## How about ask V1?

Did not try this yet but I would not expect this to work ...

# Important: Keep your development environment in sync

When you decide to work on the APLs/APLAs from your local workspace then **be warned** that changing template names or even the APL/APLA contents from the Developer Console may cause your git branches to get **out of sync**. 

When preparing this article I ran into the situation that even a fresh "**git init --hosted-skill-id**" did not download changes that I could definitely see and execute from the developer console.

Manual git merges between **master** and **dev** branches may be necessary to fix such a situation. Or setting up a new skill from scratch and cloning all the artifacts. The latter technique saved me this time.

This problem is not new. This is not related to neither APL nor APLA. I ran into this quite often into the past and had some discussion with ask v2 developers already regarding this problem.

With better tools coming up both in the browser and on the command line I see an increasing likelihood of this to happen. So what I recommend here ist that you decide to either work following one of these two models:

  1. Clone skill once, startup your preferred editor and proceed to work with push model only.
  2. Use developer console only.

Either approach works. I use both of them. But if you try to mix them you will run into trouble.




