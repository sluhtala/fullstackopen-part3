(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{23:function(e,n,t){},43:function(e,n,t){"use strict";t.r(n);var r=t(17),c=t.n(r),u=t(18),o=t(8),i=t(3),a=t(2),s=(t(23),t(4)),b=t.n(s),d="/api/persons",l={baseURL:d,addNumber:function(e){return b.a.post(d,e).then((function(e){return e.data}))},deleteNumber:function(e){return b.a.delete("".concat(d,"/").concat(e.id)).then((function(e){return e.data}))},updateNumber:function(e){return b.a.put("".concat(d,"/").concat(e.id),e).then((function(e){return e.data}))}},f=t(0),j=function(e){var n=e.notification,t=e.error;return n?Object(f.jsx)("div",{className:t?"error notification":"notification",children:n}):null},m=function(e){var n=e.person,t=e.pattern,r=e.deleteNumber;return t.test(n.name)?Object(f.jsxs)("p",{children:[n.name," ",n.number," ",Object(f.jsx)("button",{onClick:function(){return r(n)},children:"delete"})]}):""},h=function(e){var n=e.persons,t=e.filter,r=e.deleteNumber,c=RegExp("(^.* |^)"+t,"i");return n?0===n.length?"":Object(f.jsx)(f.Fragment,{children:n.map((function(e,n){return Object(f.jsx)(m,{pattern:c,person:e,deleteNumber:function(e){return r(e)}},e.id)}))}):null},O=function(e){var n=e.handleSubmit,t=e.setNewName,r=e.setNewNumber,c=e.newName,u=e.newNumber;return Object(f.jsx)(f.Fragment,{children:Object(f.jsxs)("form",{onSubmit:n,children:[Object(f.jsxs)("div",{children:["name:"," ",Object(f.jsx)("input",{value:c,onChange:function(e){return t(e.target.value)}})]}),Object(f.jsxs)("div",{children:["number:"," ",Object(f.jsx)("input",{value:u,onChange:function(e){return r(e.target.value)}})]}),Object(f.jsx)("div",{children:Object(f.jsx)("button",{type:"submit",children:"add"})})]})})},p=function(e){var n=e.filter,t=e.setFilter;return Object(f.jsxs)(f.Fragment,{children:[Object(f.jsx)("div",{children:"filter shown with "}),Object(f.jsx)("form",{onSubmit:function(e){e.preventDefault()},children:Object(f.jsx)("input",{value:n,onChange:function(e){t(e.target.value)}})})]})},v=function(){var e=Object(a.useState)([]),n=Object(i.a)(e,2),t=n[0],r=n[1],c=Object(a.useState)(""),s=Object(i.a)(c,2),d=s[0],m=s[1],v=Object(a.useState)(""),x=Object(i.a)(v,2),N=x[0],w=x[1],g=Object(a.useState)(""),S=Object(i.a)(g,2),k=S[0],F=S[1],y=Object(a.useState)(null),C=Object(i.a)(y,2),T=C[0],D=C[1],E=Object(a.useState)(!1),R=Object(i.a)(E,2),I=R[0],J=R[1];Object(a.useEffect)((function(){b.a.get(l.baseURL).then((function(e){r(e.data)})).catch((function(e){console.log(e)}))}),[]);var L=function(e){e.preventDefault();var n=t.find((function(e){return e.name===d}));n?function(e){if(window.confirm("".concat(e.name," is already added to phonebook, replace the old number with new one?"))){var n=Object(o.a)(Object(o.a)({},e),{},{number:N});l.updateNumber(n).then((function(c){console.log(c);var o=Object(u.a)(t),i=o.find((function(n){return n.id===e.id}));i.number=n.number,r(o),D("Number of ".concat(i.name," updated")),setTimeout((function(){D(null)}),4e3)}))}}(n):function(){var e={name:d,number:N};l.addNumber(e).then((function(n){e.id=n.id,r(t.concat(e)),D("".concat(e.name," added")),setTimeout((function(){D(null)}),6e3)})).catch((function(e){D(e.response.data.error),J(!0),setTimeout((function(){D(null),J(!1)}),6e3),console.log(e)}))}(),m(""),w("")};return Object(f.jsxs)("div",{children:[Object(f.jsx)("h2",{children:"Phonebook"}),Object(f.jsx)(j,{notification:T,error:I}),Object(f.jsx)(p,{filter:k,setFilter:function(e){F(e)}}),Object(f.jsx)("h3",{children:"Add a new"}),Object(f.jsx)(O,{setNewNumber:function(e){return w(e)},setNewName:function(e){return m(e)},newName:d,newNumber:N,handleSubmit:function(e){return L(e)}}),Object(f.jsx)("h3",{children:"Numbers"}),Object(f.jsx)(h,{persons:t,filter:k,deleteNumber:function(e){!function(e){if(!1!==window.confirm("Delete ".concat(e.name,"?"))){l.deleteNumber(e).then((function(e){return console.log(e)})).catch((function(n){console.log(n),J(!0),D("Information of ".concat(e.name," has already removed from the server")),setTimeout((function(){D(null),J(!1)}),5e3)}));var n=t.filter((function(n){return n.id!==e.id}));r(n)}}(e)}})]})};c.a.render(Object(f.jsx)(v,{}),document.getElementById("root"))}},[[43,1,2]]]);
//# sourceMappingURL=main.1ff6c748.chunk.js.map