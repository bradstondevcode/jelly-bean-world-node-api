# Jellybean World Node API Starter code


## server.js Code Snippets

#### Get Worlds

```javascript
function getWorlds(){

	axios({
		method: 'get',
		url: `${usersDBURL}/worlds/_all_docs`,
		headers: {'Authorization': `Basic ${authKeyEncode}`}
	})

}
```

#### Get World

```javascript
function getWorld(){

	axios({
	    method: 'get',
	    url: `${usersDBURL}/worlds/${worldName}`,
	    headers: {'Authorization': `Basic ${authKeyEncode}`}
	})

}
```

#### Create World

```javascript
function createWorld(){

	axios({
	    method: 'post',
	    url: `${usersDBURL}/worlds`,
	    headers: {'Authorization': `Basic ${authKeyEncode}`},
	    data: newWorldTemplateData
	})

}
```

#### Update Jellybean Count

```javascript
function updateJellyBeanCount(){

	axios({
	    method: 'put',
	    url: `${usersDBURL}/worlds/${updatedWorldData["_id"]}`,
	    headers: {'Authorization': `Basic ${authKeyEncode}`},
	    data: updatedWorldData
	})

}
```

#### Delete World

```javascript
function deleteWorld(){

	axios({
	    method: 'delete',
	    url: `${usersDBURL}/worlds/${worldName}?rev=${rev}`,
	    headers: {'Authorization': `Basic ${authKeyEncode}`},
	})
	
}
```