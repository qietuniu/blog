





https://segmentfault.com/a/1190000039190541

https://v5.reactrouter.com/web/guides/quick-start

https://reactrouter.com/docs/en/v6/getting-started/tutorial

https://github.com/remix-run/react-router

## 基础hooks

### useHistory

useHistory 钩子返回 history 对象，可以使用 useHistory 进行导航

```jsx
import { useHistory } from "react-router-dom";

function HomeButton() {
  let history = useHistory();

  function handleClick() {
    history.push("/home");
  }
}
```

### useLocation

useLocation 钩子返回当前URL的 location 对象。可以把它想象成一个useState，每当URL发生变化时，它都会返回一个新的位置

```jsx
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useLocation } from "react-router-dom";

function usePageViews() {
  let location = useLocation();
  useEffect(() => {
    ga.send(["pageview", location.pathname]);
  }, [location]);
}
```

### useParams

useParams 动态参数列表的引用对象，用于获取`<Route>`中的 match.params (动态参数)

```jsx
import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";

function BlogPost() {
  let { id } = useParams();
  return <div>Now showing post {slug}</div>;
}

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route path="/blog/:id">
        <BlogPost />
      </Route>
    </Switch>
  </Router>,
  node
);
```

### useRouteMatch

useRouteMatch 尝试以与`<Route>`相同的方式匹配当前URL。它主要用于访问匹配数据，而无需实际渲染`<Route>`

```js
import { Route } from "react-router-dom";

function BlogPost() {
  return (
    <Route
      path="/blog/:slug"
      render={({ match }) => {
        // Do whatever you want with the match...
        return <div />;
      }}
    />
  );
}
```

## 基础组件

### 路由Router

#### BrowserRouter

使用HTML5 History API（(pushState, replaceState and the popstate event）来保证 UI 组件和 URL 同步

- basename： 基准URL，斜杠开头
- getUserConfirmation: 用于确认路由跳转的函数。默认使用[window.confirm](https://link.segmentfault.com/?enc=v39odlDUINkgvtGPFjdCPw%3D%3D.V4ILcpFjkr9cxlQBulnyFIOsjrkDJaKy%2B7kg9xxjfgbFkTO2LYQmNWUfxkzOxURRd%2B%2FNQEd0JdO1bRua6j4HEg%3D%3D)
- forceRefresh：如果值为 true 路由跳转将会刷新整个页面。可以使用它来模拟传统服务器渲染应用程序，路由跳转之间刷新页面的工作方式
- keyLength： location.key的长度，默认为6。
- children：渲染子元素

```jsx
<BrowserRouter 
  	basename="/calendar"
    getUserConfirmation={(message, callback) => {
      // this is the default behavior
      const allowTransition = window.confirm(message);
      callback(allowTransition);
    }}
   	forceRefresh={true} 
  	keyLength={12} 
  >
    <Link to="/today"/> // renders <a href="/calendar/today">
    ...
</BrowserRouter>
```

#### HashRouter

使用 Hash 模式路由(i.e. window.location.hash)来保证 UI 组件和 URL 同步（Hash模式不支持location.key或location.state）



- basename： 基准URL，斜杠开头
- getUserConfirmation: 用于确认路由跳转的函数
- hashType：window.location.hash 的编码类型
  - "slash" - 类似 #/ 或 #/sunshine/lollipops
  - "noslash" - 类似 # 或 #sunshine/lollipops
  - "hashbang" - 创建 [“ajax crawlable”](https://link.segmentfault.com/?enc=L0rVazUWnRHaCPk8qXqD1Q%3D%3D.KniDits4XSlu0%2F5hG2YGWbCK2BkyhEIR20RblaN9%2BDIE4PPm55DSe3vFmURPOcNnM3%2FG%2BIOodfMUwDlM7fFt6zl6ShWWTKz%2BVt1opWZe6eY%3D)Hash (Google弃用) 类似 #!/ 或 #!/sunshine/lollipops
    默认为"slash"。
- children：渲染单个元素



#### MemoryRouter

特殊`<Router>`，将URL的历史记录保存在内存中(不读取或写入地址栏)。在测试和非浏览器环境(如React Native)中很有用。

- **initialEntries `<array>`**
  历史堆栈中的位置数组。这些对象可以是包含{pathname, search, hash, state}的完整位置对象，也可以是简单的字符串url。
- **initialIndex `<number>`**
  initialEntries 数组中初始位置的索引。
- **getUserConfirmation `<function>`**
  用于确认导航的函数。当直接使用<MemoryRouter>和<Prompt>时，必须使用这个选项。
- **keyLength `<number>`**
  location.key的长度。默认为6。
- **children `<element>`**
  要渲染的子元素



```jsx
<Link to="/courses?sort=name" />
<Link to={location => ({ ...location, pathname: "/courses" })} />
<Link to="/courses" replace />
```



### 链接Link

#### Link

提供声明式、可访问的导航。

- To<string|object|function>:
  - pathname: `<string>` 表示要链接到的路径
  - search: `<string>` 查询参数
  - hash: 一个放在URL中的Hash，例如 #a-hash.
  - state: location.state 参数.
- Replace<boolean>:
  - true: 单击链接时将替换当前历史条目
  - False: 默认添加新条目
- others: 如title, id, className等。

```jsx
<Link to="/courses?sort=name" />
<Link to={location => ({ ...location, pathname: "/courses" })} />
<Link to="/courses" replace />

```



自定义导航组件

```jsx
const FancyLink = React.forwardRef((props, ref) => (
  <a ref={ref} {...props}>💅 {props.children}</a>
))

<Link to="/" component={FancyLink} />
```



#### NavLink

特殊的`<Link>`，当它匹配当前URL时，它会为当前处于激活状态链接添加样式。

- **activeClassName `<string>`**
  元素处于活动状态时提供的class样式。默认的类名称是active。这将与className 连接
- **activeStyle `<object>`**
  当元素处于活动状态时应用于元素的内联style样式。
- **strict `<boolean>`**
  如果为true，URL匹配时使用严格模式，路径的末尾斜杠也会匹配
- **isActive `<function>`**
  用于添加额外的逻辑以确定链接是否活动状态。如果您想要做的不仅仅是验证链接的路径名与当前URL的路径名是否匹配，那么就应该使用这个方法。
- **location `<object>`**
  isActive一般用于比较当前的历史位置(通常是当前浏览器的URL)
- **aria-current `<string>`**
  在活动链接上使用的 aria-current 属性的值。可用值:
  - "page" - 用于指定一组分页链接中的链接
  - "step" - 用于指示基于步骤的进程的步骤指示器中的链接
  - "location" - 用于指示在视觉上高亮显示为流程图的当前组件的图像
  - "date" - 用于指示日历中的当前日期
  - "time" - 用于指示时间表中的当前时间
  - "true" - 用于指示导航链接是否处于活动状态
  - "false" - 用于防止辅助技术对当前链接做出反应(用例是在一个页面上阻止多个aria-current标签)
    默认为 "page".

```jsx
<NavLink
  to="/events/123"
  activeClassName="selected"
  activeStyle={{
    fontWeight: "bold",
    color: "red"
  }}
  isActive={(match, location) => {
    if (!match) {
      return false;
    }

    // only consider an event active if its event id is an odd number
    const eventID = parseInt(match.params.eventID);
    return !isNaN(eventID) && eventID % 2 === 1;
  }}
>
  Event 123
</NavLink>
```

#### Redirect

导航到新位置。新位置将覆盖历史记录堆栈中的当前位置

- To<string|object>: 要重定向到的位置
  - pathname: `<string>` 表示要链接到的路径
  - search: `<string>` 查询参数
  - hash: 一个放在URL中的Hash，例如 #a-hash.
  - state: location.state 参数.
- Push: 如果为true，重定向会将新的条目推入历史记录，而不是替换当前条目
- from：要重定向的路径名
- **exact `<boolean>`**
  完全匹配;相当于Route.exact
- **strict `<boolean>`**
  严格的匹配;相当于Route.strict。

注意：仅当渲染的`<Redirect>`内部时，才能用于匹配位置`<Switch>`

```jsx
<Route exact path="/">
  {loggedIn ? <Redirect to="/dashboard" /> : <PublicHomePage />}
</Route>
```



