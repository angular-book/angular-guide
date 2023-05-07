# Using Libraries to Structure Your Application

I find the best libraries (like the best frameworks, below) emerge sort of organically from a code base. They often start as a `utils` file or package. The junk drawer. The dumping ground for all the non-cohesive stuff in your application. Functions for manipulating dates, validating data, reading files, etc. You begin to notice a general coherence around some of the stuff in that junk drawer. You clean it up a little, add some concepts around it. Then other people in the project start using your stuff. They think they are _general_ utilities even though you created them for your specific use.

During a retrospective you show up a minute or two late, as is your style. You notice everyone is looking at your nervously. Turns out that big outage we just had? It was _your fault_. Joe had used your utilities for writing to a file and they found that your code sucks! It doesn't close the file when it is done!

Meanwhile, you didn't even know anybody was using this stuff! You knew when you created it that closing (and opening) the file was _your_ responsibility. You just hadn't added it to the functions yet. It's on your personal backlog.

It wasn't created for _general_ use, it was created for a specific use. _Yours_.

Most software is created by teams of people. Does this mean that _every stinking line of code_ we write has to be _crafted_ and _tested_ for every conceivable use by any old developer that could stumble upon it? Talk about not only _velocity_ killing, but also _ambition_ killing. It might be understandable if you resort to a mindset that says "Ok, I'll do _all_ the logic in my component for now on! No way anybody is going to be able to reach into _that_ and abuse my beautiful code!".

But people are using your code for a reason. As an expedient. And it is, overall, pretty awesome and helpful. At that point you and your team need to make a decision. This code was written as a side-effect of solving a problem in _this application_ (in other words, it works in this specific use case, but isn't designed for more general use).

That _might_ be the time when you invest in converting your beloved secret `utils` package into a library.

Extract it out of the application. Make it a Nuget package, an NPM package, a Go Module, or whatever. Hell, if it is _that_ good, make one of each! And that library would be written (re-written) to anticipate more _general_ use. It would be documented for that. It would have tests that prove how it can be used _generally_ (usually meaning more low-level tests like Unit Tests).

And _if_ your application wants to use this library, then you sign a contract, so to speak. Your application takes a _dependency_ on that library, and, better, a specific version of that library. It's right there in your `package.json`, or `.csproj`, or the archetype for your Maven project or whatever. And if I update that library, or change it in any way, I will change the version number. You can decide if you want to take that on or not.

Basically you are saying when you create a library that your code has a good way of doing some specific thing. It has some level of reliability, it has been tested, documented, etc. It's a big undertaking, but it is _often_ worth it for you and your team and perhaps the entire company/enterprise. Heck, maybe even bigger than that! You could open source that library and start giving back for a change, you mooch!

The point being here that both libraries and frameworks are usually best if they are _extracted_ from a proven use (application). Over the life of developing an application you start seeing some glitches in the matrix. Deja vu. You are doing the same thing, generally, over and over again. You create some code to save you some time. Other people start using that code. Without some kind of acknowledgement that this is happening, you end up with a dependency nightmare. A lot of resentment. And your code base tends towards _solidity_ (as opposed to fexibility).

Know when the code you have written has crossed over from application code into library or framework code. Make your application project structure put some guardrails around casual "code reuse".
