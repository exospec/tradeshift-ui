# Principles
For most people, Tradeshift is not their primary work tool. It means that these people will only use Tradeshift occasionally. Hence, we generally don’t consider the user an expert user, and the core parts of  Tradeshift have been designed with this in mind. This doesn’t mean we cannot or shouldn’t provide powerful interfaces that cater to experienced users though. By adapting the interface through a user’s repeated use and providing powerful shortcuts, expert users will be able to experience a productivity boost.

By taking the following 8 principles into account when building a Tradeshift application, you’ll maximize your chances of creating a good experience for your users.

### 1. Remember users’ choices

Users often need to repeat their work tasks. Make sure to remember the users’ previous choices and inputs to support future choices. If at all possible, automate the mundane tasks.

* Adjust defaults with used values
* Provide access to previously used values
* Whenever applicable, ask the user if the used values should be new defaults

**Example:** *When a user starts using Tradeshift the list of currency options contains one suggested currency: the one used in the company registration country. If the user uses another currency, this newly used currency will appear as an option the next time the user needs to fill out the currency value. This way lists of regularly used values are created.*

![Remember users' choices](assets/img/iphone5-rememberoptions.png)


**Opposite principle:** *Always providing the same ground zero to users, no matter when or how many times the user has used your application. Simultaneously clearing previously used values. This may be relevant in other types of applications where values are never reused or where different users share one account.*

### 2. Build learning into the UI

Consistent use of the design patterns provided in this guide is important to support the users’ learning and recognition. Re-use and consistent use will give the user the ability to apply knowledge from one functional area to another, lowering the cognitive load and increasing performance. So do only invent new design patterns when absolutely necessary.

* Reuse design patterns to provide an experience of recognition
* Be mindful of the users’ first run experience
 
**Example:** *Learning to work with dynamic option lists in the context of selecting a unit type (here aided by a first run embedded description) creates knowledge about how to solve other tasks. The currency selector uses the same design pattern as the unit type selector. The user can now leverage previous experience since the designs are based on the same pattern.*


![Build learning into the UI](assets/img/iphone-patternreuse.png)

**Opposite principle:** *Individual applications on mobile phones, especially games, are often wildly different to establish individual identity and to better optimize to very narrow tasks supported by that specific app. But since all/most Tradeshift apps are extensions all related to the core consistency is chosen.*

### 3. Keep users in task solution mode

People come to Tradeshift to work with their business data and flows – not to work with buttons, inputs or manuals. Keeping the users in the functional flows is important. Avoid forcing the user to out-of-context settings pages to change things, that could be adjusted in-context. Provide sensible defaults that potentially prevent the user from wanting to change a setting in the first place.

Further avoid forcing the user to read FAQs and manuals out of context. Be mindful of the users’ first run experience.

Whenever a user intends to export Tradeshift data, make sure you know why. If you can provide a view of the data or functionality that’d keep the user in the flow, the user gets a better experience, and your product is better.

* Avoid settings pages
* Keep help descriptions in the app, not outside
* Understand why and when the users want to export application data. Consider if an improvement could solve the need.

**Example:** *Letting the user update address and company registration information from the public profile page makes settings pages for these details unnecessary.*


**Opposite principle:** *Encouraging the user to spend significant time understanding your app properly before using it. E.g. by letting the user read a manual and a separate getting started guide. Then, still before use, configuring the product for correct use. Many medical/healthcare products work this way, as improper understanding can be dangerous. Quickbooks is an example of a settings heavy application as well – but it seems Intuit is moving away from this approach, as it clearly (Tradeshift's internal tests show) makes initial use harder.*

### 4. Mobile first

Global reach includes users who are not primarily working in front of a computer all day. It’s users who’re working on the road and even users who don’t ever have access to a laptop/desktop computer. Most often it’s valuable thinking the mobile use cases first – it’ll improve the experience for all other users. Given the diversity of the markets Tradeshift is made available in and the shift towards mobile in more mature markets, don’t underestimate the mobile scenarios.

* Consider the mobile use cases first.
* Be optimistic when considering the mobile use cases.
* Be aware that many Tradeshift users will have both a regular computer and a mobile device. Some will not have a computer.

**Example:** *Many users check their email continuously on their smartphone. A primary vehicle for notifying users and getting users to complete tasks in Tradeshift rely on email as communication channel – such as when a new invoice is received. Allowing smooth transition from an email notification telling about the received invoice, to actually accepting or rejecting the invoice on the same device, allows the user to react faster. Also, the user doesn’t need to mark the email as unread or otherwise flag it to see it on a desktop computer later.*


**Opposite principle:** *Expert systems where users are expected to work on a computer in a known location/setting and where the user is not pulled into the application via e.g. email notifications. While we do have this kind of applications on the platform the majority of future features integrate tightly into email and the ability to respond from these.*

### 5. Help the user focus

Establish a visual hierarchy on you application pages that support the prioritized features the page is intended to present. Most used features get dominant colors, positions and sizes while less used features are visually down-prioritized. The design patterns are created to guide you to doing this.
Make sure to only present the data the user needs to make decisions at any given time. Avoid just rendering out all the data you have, just because you have it.

* Render out only the data necessary for your use cases.
* Establish a clear visual hierarchy optimized for the use cases you intend to solve.
* The prioritization you do when designing your app is cognitive load you lift off the end users’ shoulders

**Opposite principle:** *Specialist/expert systems used daily by users can typically present more data, information and actions than non-expert, occasionally used systems. The expert user has plenty time to master complex interfaces and will eventually receive intensive product training. So in those cases intricate shortcuts and an abundance of information in large tables can be empowering. Many Tradeshift users, though, are often occasional users, whose primary profession is normally not within the functional areas covered by Tradeshift (e.g.invoice creator, enterprise invoice coder, …).*

### 6. Provide a sense of context

Whenever the user navigates your application, make sure to provide enough visual clues that the user understands where and why he arrived at a certain screen. Buttons with explanatory text is one solution. Animations to explain the scene changes is another solution. Stacking pickers is an example of this. The visual stacking provides a trail back while each layer appears in a way that supports the same concept.

* Think before/after states into any action
* Use clues such as animation to show how one item relates to another

**Opposite principle:** *Expert systems again – or alternatively text based systems such as DOS prompt or Terminal. Here the visual clues have been (almost) completely omitted and rely on the user to contain and know context.*

### 7. If it looks easy, it’s easier to get started

Tradeshift encourages use by having an interface that looks easy to use. Instruments such as slightly oversized elements and typography, plenty of whitespace, clear colors, simple iconography must all be considered when laying out your application. Avoid things like overcrowding areas, unnecessary divider lines, stacking content closely, micro-typography and un-aligned elements. Use a visual/UI designer if in doubt.

* Spend time ensuring your application screens are well laid out and correspond with Tradeshift’s UI guidelines
* Re-evaluate all elements presented in your application UI and consider if they need to be there to let the user make decisions and actions
* Use a UI designer to get the visuals right if in doubt

**Opposite principle:** *Heavier applications such as 3D software or even games can allow a steeper learning curve as users both need all functionality at their fingertips all the time (much less linear flow of actions) and time and interest in feature discovery isn’t unexpected.*

### 8. Do end-user testing

No heuristics in the world can replace end-user testing. Get to know the truth about the target users’ ability to interact with your app. Improve when necessary.

**Opposite principle:** *When building internal tools where the users are within arms reach. The benefits of having direct access to every user can eliminate the need for classical end-user testing, as the product in use is the actual testing.*


------------------------------------------------------------------------
Continue reading our Design Guidelines on the [UI Structure](//tradeshift.github.io/docs/#design/guidelines/structure.html) page.