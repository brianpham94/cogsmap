# Team K5’s Milestone 14

**Description of what each team member has done on the project**

Thomas Loh: Ironing out design heuristics that we’ve violated and making the user experience as smooth as possible. Our current UI has some unintuitive designs which did not allow for a user to readily figure out how to use our application. An example of this would be when you’re saving a place but the saved places will also remove all other markers on the map, effectively preventing a user from adding anymore places. Another part I worked on ironing out was the display of reviews where it would show up as undefined at first. This was a little tricky and I am still figuring it out but we should not show a user any error messages that they would not know how to deal with.

Lauren Gong: I worked on refining the wording on our app and styling other basic UI elements that needed to be cleaned up (buttons, popups etc.) to make sure that it is as clear as possible to help users figure out what they want to do. Additionally, I worked on adding the up and down carats and making them toggle to the table of places to make sorting the lists more intuitive and easy to access. I also changed the legend to hopefully make it more clear what the different colored markers are indicating. I also helped format the popups to be more uniform (based on how they’re accessed: from ‘View’ button in table, Favorited Places, or clicking on the marker itself). 

Hyungyun Kim: I added 'add' more buttons from popup, so users can add from everywhere other than list. I fixed errors for a Favorite List - Now we can see popup menu from clicking a place, and it open popup automatically. Second error was it removed all markers from searched list after clicking a place from a Favorite List - Now, the Favorite list and the Searched list don't affect each other. From review function, there was wrong route from saved list, so I added new modal function to fix this issue. I also added "All Category" filter on the left, so users now can see all places after clicking specific category. I also created new logo and changed UI - changing design of titles.

Brian Pham: Helped to finalize and smoothen our design heuristics and ideas so that it would be intuitive and easy for users to use our web app. Some of these include changing our app name, redefining certain wordings in various locations on the app and adding symbols, such as the sorting triangles, to clearly depict certain functionalities. I also changed some of the UI by revamping it so the layout wouldn’t mess up when users access the page from different types of browsers, and mobile (just in case, even though this isn’t a mobile app). Also updated the sorting implementation from last week so now users can sort from top down or bottom up by clicking on the sorting triangle.

**Description of features**

1. Changed name of app to better reflect its purpose, altered legend to be more intuitive, included ‘All Categories’ to give users the flexibility to return to their original search after filtering through the markers.  
![alt text](https://github.com/withyuns/cogsmap/blob/master/images/md14_screen01.png)

2. Added carats to each category in the table to help make sorting places based on different criteria more intuitive for users.  
![alt text](https://github.com/withyuns/cogsmap/blob/master/images/md14_screen02.png)

3. Changed the ‘Favorited Places’ function to allow users to access the places they have saved without clearing out all of the markers on the map. When you click on a place, it will change the view of the map to the specified marker and will open the popup automatically to make it easy to identify.  
![alt text](https://github.com/withyuns/cogsmap/blob/master/images/md14_screen04.png)

4.  Changed popups to include ‘Add to Favorites’ button to allow more flexibility for users who are exploring different places directly on the map. 
![alt text](https://github.com/withyuns/cogsmap/blob/master/images/md14_screen05.png)
