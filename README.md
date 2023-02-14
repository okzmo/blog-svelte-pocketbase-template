
# ⚠️ PROJECT STILL UNDER CONSTRUCTION, MEANING SOME FEATURES ARE NOT IMPLEMENTED YET OR INSTALLATION MIGHT FAIL.
---

# An easy to use blog template ✒️ 
You can use pocketbase as I've done or you can tweak the template with whatever you want to use but I'll only show how to use the blog with pocketbase.

What can you do with pocketbase ? 
- Create articles with a simple built in markdown editor.
- Have users interact with your article with comments and likes. // TODO
- Give others the ability to also write articles simply by changing their role in pocketbase.

## How to install
First of course you have to clone or download this project.

Then you can start the blog simply by running :
```bash
# If you're using npm
npm run dev

# If you're using yarn
yarn dev

# If you're using pnpm
pnpm run dev
```

On the first run you'll probably encounter problems, of course it's because you don't have your pocketbase setup yet, so let's do that !

Download the [exe file](https://pocketbase.io/docs/) for pocketbase.

Place it in a directory named `backend` or whatever you want.

Then you can run this command (inside the directory you just created with `pocketbase.exe` inside it) that will automatically setup your pocketbase :

```bash
.\pocketbase serve
```
If you look closely in your terminal you'll see two links :

```bash
Server started at: http://127.0.0.1:8090
    - REST API: http://127.0.0.1:8090/api/
    - Admin UI: http://127.0.0.1:8090/_/
```

The first one with the route `/api/` will be used to fetch or do whatever you do with a REST API usually.

The other on the other hand will be used as an admin panel. 

"*No joke sherlock it's literally named 'Admin UI'*" 

Yes I know but at least you can't say I didn't tell you aha, now you can go to the Admin UI and look around before doing the next step.

When you're done you can import the `pb_schema.json` in the root folder of this project to the Admin UI. This will give you everything you need to make the blog work.

![Import to PocketBase](https://media.discordapp.net/attachments/632533935141683200/1075062231546462218/import.png)

When the schema is imported you can check if all the collections have been added and then restart your front-end (if you didn't shut it down previously) and you'll see everything without errors now ! 

You'll also be able to connect and give you an editor role in pocketbase to start writing some articles !

I hope this template will be useful for your next blog !

PS : If you want to contribute to this project OR change anything on your own (for example the styling because it's not really good) please do it's your blog after all 😃.