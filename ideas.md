### List of native events
[MDN-Events](https://developer.mozilla.org/en-US/docs/Web/API/Element#events) List of official events to add for a squence implementation

### TODO n.1

Create a way to assign animations from modules based on and event 

__Example:__ 
1. Create a `<button>`
2. Create some `<p>` tags
3. bind the click event of the `<button>` to the `<p>` tags as a trigger to start the animations
   
__ISSUES__:
To identify the element which triggers the animation we should add an Id to the triggering element so we can precisely assign the animations

__Possible Event Listeners__
* click
* mouse up,down
* mouse enter over
* touchend ?


### TODO n.2

Create a system to concatenate animations 

__Event listeners:__
* tansitionstart
* tansitionrun(reference triggered animations by transition run time in %)
* transitionend

Possible Approaches:
1. In gutenberg editor create any `HTMLElement`
    1. Associate any transition event as trigger 
        * start-end as boolean
        * run as %
