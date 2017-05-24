# Team K5’s Milestone 13

**Description of what each team member has done on the project**

Thomas Loh: Worked on adding sorting functionality to the list of places that are displayed on the map. This would allow users to sort based on names, ratings, price, category, and reviews. Worked on figuring out a bug where undefined objects would appear and disappear which may alarm our user. This utilized Promise objects which would wait for a response from the yelp API which was causing problems because it was too slow. 

Lauren Gong: I worked on changing the UI for the map based on the feedback that we got last week. Now, the map does not have the red shading which was causing confusion amongst users. This new UI makes it easier for users to detect the markers on the map. Additionally, I worked on refining the layout and text of the modals and buttons to make information more clear and interactions more precise. I also added the addresses of businesses to the popups of each place/business to help users figure out where they might want to go. I also added a legend to help users better understand the meaning of the color of each marker. 

Hyungyun Kim: I worked on a list of places by creating “View more 5 places” buttons, now list only display 5 places at a time because list was too long before. I added “add” button, so users can store any favorite places as bookmarks. On the left, I added a place “Stored list” so users can put favorite places there. I created JSON file, and it store places or remove places. Users can delete place one by one OR delete all place at once, so I created each functions. Also, I did “Compare” button (It is different from original chart), so users can compare between only saved places. 

Brian Pham: Worked on sorting functionality that allows user to sort each category on our displayed list of search results. Currently, we have the sort function to do top down only, but we may decide to add a bottom-up sort later on after this milestone. Also worked on figuring out some bugs around the initial undefined list of reviews when the user initially clicks on a marker’s Review. This will solve the potential confusion that our users may have when they’re trying to look at a location’s reviews, despite the undefined message not lasting very long.

**Description of features**

1.  We changed the map UI from the original so that users can identify the markers more clearly and added a legend to help them understand the meaning behind the colors. 

![alt text](https://github.com/withyuns/cogsmap/blob/master/images/md13_screen01.png)


2.  We included buttons for users to save specific businesses or locations of interest so that they can return to them later.  We also limited the number of businesses listed at a time and added a ‘view more’ button.

![alt text](https://github.com/withyuns/cogsmap/blob/master/images/md13_screen02.png)


3. Here, users can access their saved places on the side. 

![alt text](https://github.com/withyuns/cogsmap/blob/master/images/md13_screen03.png)


4. We also included sorting functions for the chart of businesses. 

![alt text](https://github.com/withyuns/cogsmap/blob/master/images/md13_screen05.png)


5. In addition to showing the metrics for all the businesses on the map, users can compare their saved locations based on number of reviews and rating. 

![alt text](https://github.com/withyuns/cogsmap/blob/master/images/md13_screen04.png)
