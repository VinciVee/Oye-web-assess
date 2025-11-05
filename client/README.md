# [B5] REACT UTILITIES & CSS-in-JS

  - **NEW FOCUS:** The sections **B4** to **B5** will analyse wider concerns to the App including external data flow, react utilities & CSS authoring methods

&nbsp;

## B. REACT UTILITIES

As discussed, we will briefly note/update our utilities that we will need for our extended build, including:

  1. Routing with `RRD v6`
  2. Notifications with `react-toastify`
  3. HTTP Handler with `axios` (*only note continued use*)
  4. Icon library with `react-icons` (*only note continued use*)
  5. Functions library with `polished` (*future use*)

**INSTALL NEW UTILS:**

  - react-toastify: `yarn add react-toastify`
  - polished: `yarn add polished`

&nbsp;

### 1. OPTIMISING THE ROUTER FOR SCALE

**THEORY:** Early in React, we setup our basic routing which allows our React application to navigate to different URLs & generate a new page component

  - **CURRENTLY:** Our app is fine with the current setup BUT could be optimised further by incorporating a key component of RRD v6, `Outlet`, and using nested `Route`s

**KEY CHANGES:**

  - **OUTLET:** Parent routes render their child routes by rendering an `<Outlet>`.  Think of the `<Outlet>` like `{props.children}` - *we create a space for components/props to render into*, like a parameter.  Outlet functions like this, allowing nested routes to render.

  - **NESTED ROUTE:** `<Route>` elements may be nested to indicate nested UI, which also correspond to nested URL paths.

  - **RRD LINKS:** `<Link>`, much like an anchor tag, is an element that lets the user navigate to another page by clicking or tapping on it.  In react-router-dom, a `<Link>` renders an accessible `<a>` element with a real href that points to the resource it's linking to

    - **LAYMEN:** React is used to generate SPAs that remove the need for page refresh that could reset the app states. The anchor tag's href will trigger page reload WHEREAS RRDs Link (or NavLink) will not, meaning states can be preserved

&nbsp;

**STEPS:**

  - **(a) LAYOUT OUTLET:** Bring in the `<Outlet>` into `Layout` & replace `props.children` (*make sure to import from RRD*)
  
  - **(b) RENDER LAYOUT "ROUTE":** Call a parent `Route`, with a root path BUT renders the `Layout` component.  *This will be a standard open & close tag.*
  
  - **(c) NESTED MAIN ROUTE:** Wrap ALL other `Route`s within the Layout Route.  To ensure our `Home` page still renders on `/`, replace the path with `index`.  This ensures that it will take the `Outlets` place when rendered (*bit confusing!*)

    - **CHANGE:** We also updated a few routes such as `store/products` - make sure to reflect in `Header`!

  - **(d) NOT FOUND CATCHALL:** We also create a new `NotFound.jsx` page & route that to the path of `*`, which acts as a catchall where NO route is matched (*our 404!*)!

  - **(e) UPDATE LINKS:** Go to `Header.jsx` & import in `Link` from RRD.  Then within each `Nav.Link` react-bootstrap component, include `as={Link}` & replace `href` with `to`.

    - **NOTE:** We will no longer use `<a>` elements when relative linking project pages.  Only use `Link` for internal linking!

&nbsp;

### 2. SETTING ERROR NOTIFICATIONS WITH REACT-TOASTIFY

**THEORY:** We can use this utility to drop a popup on our application, particularly where an error or even a success condition occurs!

  - **DOCS:** See more on [react-toastify](https://fkhadra.github.io/react-toastify/introduction)

&nbsp;

**SETUP:** React-Toast notifications are effectively built of three main parts:

  - **(a) Toast Container:** This will be the popup container that appears on our page
  
    - **ROOT COMPONENT:** We call this in our `Layout` above the `Header` so it appears at the top of the page when called by the toast method
    
    - **PROPS:** We can adapt styling/features of the popup, by passing in props as detailed in the documentation (*see examples provided or check docs!*)

  - **(b) Toast Stylesheet:** We need to give access to toast styling, and pass this stylesheet into index.js like our other CSS

    - **KEY LINE:** `import react-toastify/dist/ReactToastify.css` in `main.jsx` below bootstrap stylesheet, but above `index.css`;

  - **(c) Toast Method:** This method will call the popup to appear & pass in text into the container 

      - **GITHUB MENU ERROR**: We call this method in our catch(err) for our `fetchData` method, inside our `useEffect` hook, in `GithubMenu.jsx`.  We will just pass back a catch-all text for any error

      - **TEST:** Make sure to see if it pops up correctly, by breaking some of the syntax in `/services/github.js`

  - **(d) BONUS - React v18:** A failsafe has also been included for `useEffect` to prevent a double-call, which came about during React v18.  Can explain if needed!

&nbsp;

### 3. SETTING THE `Loader` COMPONENT

**THEORY:** On the topic of `GithubMenu` & catering for render catch states, we will also quickly build our `TuLoader.jsx` within `components/common`

  - **NOTE:** We don't call the component "Spinner", as it can clash with React-Bootstrap, which has a library component with the same name (*same reason why our Navbar is "Header"*)

  - **METHODS:** We have two different methods, depending on your "interest" in loading spinners

    **(a) BOOTSTRAP:** Has a standard repo of spinners for [easy use](https://react-bootstrap.github.io/docs/components/spinners)

    **(b) CODEPEN:** Great source of inspiration and code for spinners - [example](https://codepen.io/AlexWarnes/pen/jXYYKL)

    **(c) THIRD-PARTY LIBRARY:** There are some third-party spinners, but many have clunky setups!

**STEPS:**

  - **(a) Create new `TuLoader.jsx`:** Create new component, use `rfce` snippet to generate a basic boilerplate.  Include a spinner from react-bootstrap, [see here](https://react-bootstrap.github.io/docs/components/spinners)

  - **(b) Import the spinner:** Inside `GithubMenu`, import the `TuLoader` and replace our generic string for the loading state

  - **(c) Test in ReactDevTools:** Open ReactDevTools in the browser, select the `GithubMenu` component, and change the loading state from `false`->`true`