# DiscordStorage
![](https://i.postimg.cc/mrX0XRM8/infinite-discord-storage.jpg)

A project built for the hackathon: Hack & Roll 2024 hosted by NUS.

## Elevator Pitch
Infinite cloud storage with Discord's Content Delivery Network. Each attachment link has a limit of 25 MB. If you divide any large file into 25 MB chunks and send them as bits, it's free storage!

## Inspiration
Did you know you can copy an attachment link on Discord from a server and send it to a person not on the server to view it? That's what initially sparked our curiosity. If anyone could simply view and download any attachment given the link, then anyone could use them to store any file they wanted.

## What it does
Essentially, we convert the original attachment into bits. Since Discord's file limit is 25MB, we separate the files into 25MB chunks. A discord bot sends these chunks to a text channel in a server. When, the user wants to download it again, we query each link and reconstruct the original file from those chunks. We also created a GDrive-like interface for users to have a seamless experience.

## How we built it
The backend is built on FastAPI in Python. We created endpoints to query Discord's API and various other endpoints to get the file structure, database, and other information for our application.
The frontend is built on React in JS. We use Flowbite: a library that provides styled components. We combined these components and further styled/formatted them to get the Google Drive feel for user experience.

## Challenges we ran into
On the backend side, we ran into trouble while figuring out how to run asynchronous operations with FastAPI.
On the frontend side, we had trouble trying to figure out the component tree structure. We had to pass a lot of props around which made it confusing to do, especially with folders and nested folder structures. 
As a whole, most of our time was spent debugging strange behaviour on the frontend, invalid requests to and from Discord on the backend. We also spent a lot of time figuring out how to change the frontend to meet the requirements of the essential API calls.

## Accomplishments that we're proud of
- Successfully chunking and reconstructing the attachments for upload/download
- Being able to upload/download with a max bandwidth of 50MB/s with one worker while using a third-party service
- Being able to create a simple, clean and functional interface

## What we learned
We learned that there are several security counter measures put in place to prevent this kind of activity. We had to make trade-offs in performance to work around these. Overall, we found a solution that works but, it's less than optimal.

## What's next for DC Storage
- Load balancing between different text channels to increase bandwidth
- Utilizing Hadoop to use more than one worker for more bandwidth