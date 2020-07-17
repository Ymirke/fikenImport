### Built in 24 hours during hack day at School of Applied Technology.

# fikenImport
Making it easy to import a list of purchases from shopify into fiken. 

To test it out, run: 
```bash
git clone git@github.com:Ymirke/fikenImport.git
cd fikenImport
npm run installAll
npm run dev
```

## To use the app you need three things. 
* Fiken Personal API token
* Fiken Company Slug
* CSV export of orders form shopify. (Mock data is also included in backend/fiken/)

### Company slug
Company slug is your company identifier in Fiken. You can find it by looking at the url when logged into fiken. 

![Image of company slug](https://github.com/Ymirke/fikenImport/blob/master/company-slug.png)

### Getting your personal Fiken API key.
To use the application you need a personal API-token from Fiken. 
1. You can get one by going logging into fiken
2. Pressing your profile picture in the top right ->
3. Pressing "rediger konto" ->
3. Under "sikkerhet" you can create a personal API key. 

If you do not have that option available you might have to opt-in as a fiken developer. 
1. That can be done by pressing "Profil" from the same view.
2. Then checking ✅ the box that says "Jeg jobber med utvikling av integrasjoner mot Fiken"
3. go back to "sikkerhet" tab and create API key. 

This can change in the future. For reference check:
https://api.fiken.no/api/v2/docs/

