// Initial setup of rows and columns
let flag=0;
let start_node_row=Math.floor(Math.random() * 31);  
let start_node_col=Math.floor(Math.random() * 61);
let end_node_row=Math.floor(Math.random() * 31);
let end_node_col=Math.floor(Math.random() * 31);

let src_define=start_node_row+'+'+start_node_col;
let dest_define=end_node_row+'+'+end_node_col;
let src_id='#tr'+start_node_row+' .td'+start_node_col;
let dest_id='#tr'+end_node_row+' .td'+end_node_col;

    
const seg=(s)=>{
  let op=''
  for(let i=0;i<s.length;i++)
  {
    if(s[i]=='+')
      break;
    else
      op+=s[i];

  }

  return op;
}

const extractcol= (s)=>
{
    let output=''
    for(let i=0;i<s.length;i++)
    {
        if(s[i]==' ')
            break;
        else
            output+=s[i];
    }
    return output;
}

const rseg=(s)=>{
  let x=s.indexOf('+');
  let op=s.substring(x+1);

  return rseg;
}
let table=document.getElementById('tbl');
console.log(table);
for(let i=0;i<31;i++)
{
  let tre=document.createElement('tr');
  let idx='tr';
  // if(i<=9)
  //   idx+='0'+i;
  // else
  idx+=i;
  tre.setAttribute('id',idx);
  table.appendChild(tre);


}



let mouseclicked=false;
let arr=[];
let src_ind;
let dest_ind;
for(let i=0;i<31;i++)
      {
        let a2=[];
        for(let j=0;j<61;j++)
        {
          a2.push(1);
        }
        arr.push(a2);
      }
const setup=()=>
{   
    for (let i=0;i<31;i++)
      {
        let row;
        row="tr"+i;
        let t=document.getElementById(row);
        for(let j=0;j<61;j++)
          {
            let p=document.createElement('td');
            let col="td"+j;
            p.setAttribute("class", col);
            t.appendChild(p);        
          }
      }
      document.getElementById('tbl').addEventListener('click',(e)=>{

        let row=e.target.parentNode.id;
        let col=e.target.className;
        col=extractcol(col);
        let row_num=Number(row.substring(2));
        let col_num=Number(col.substring(2));
        console.log('---->',col);
        console.log('New ',extractcol(col));
        let selector='#'+row+' '+'.'+col;
        console.log('-->',selector)
        console.log('---')

        if(!document.querySelector(selector).classList.contains('tblcell'))
        {
            document.querySelector(selector).classList.add('tblcell');

     
        arr[row_num][col_num]=1000000;
        }
        else
        {
            document.querySelector(selector).classList.remove('tblcell')
  
          arr[row_num][col_num]=1;
        }
        

      });
      document.getElementById('tbl').addEventListener('mousedown',()=>{
        mouseclicked=true;
      //  console.log('Mouse Pressed')
      })


    document.getElementById('tbl').addEventListener('mouseup',()=>{
      mouseclicked=false;
    //  console.log('Mouse released')
    })
    document.querySelector(src_id).classList.add('source')
    document.querySelector(dest_id).classList.add('destination');

    document.getElementById('tbl').addEventListener('mouseover',(e)=>{
      if(mouseclicked)
        {
          let row=e.target.parentNode.id;
          let col=e.target.className;
          col=extractcol(col);
          let row_num=Number(row.substring(2));
          let col_num=Number(col.substring(2));
          
          let selector='#'+row+' '+'.'+col;
    
          if(!document.querySelector(selector).classList.contains('tblcell'))
          {
              document.querySelector(selector).classList.add('tblcell');
  
    
          arr[row_num][col_num]=1000000;
          }
          else
          {
              document.querySelector(selector).classList.remove('tblcell')
              arr[row_num][col_num]=1;
          }
          
        }
    })

}



setup();


const mapLen= (s)=>
{
	let count=0;
	for (i in s)
  	count++;
    
    return count;
}

const printPath =(finalpath)=>{

  for (let i=0;i<finalpath.length;i++)
      {

        console.log('length is',finalpath.length) 
        console.log('flag-->',flag);  
        setTimeout(()=>{
          let r=Number(seg(finalpath[i]));
          let c=Number(finalpath[i].substring(2));
          let str='#tr'+r+' .td'+c;
          console.log(document.querySelector(str));
         
        document.querySelector(str).classList.remove('anime');
        document.querySelector(str).classList.add('pathprinter')
        },50*i);
      
      }

    }
const dijkstra= (arr,src,dest,printPath)=>
{

  let visited=[];
  let parent={};
    parent[src]=-1;
    let dist_from_source = {};
    for(let i=0;i<31 ;i++)
      {
        for(let j=0;j<61;j++)
          {
            let ind=i+'+'+j;
          dist_from_source[ind]=1000;
          if(ind==src) 
            dist_from_source[ind]=0;
      } 
    }

    let len=mapLen(dist_from_source);

for(let j=1;j<=len && !visited.includes(dest);j++)
{
  let mini=100000;
  let ind=src;
    for(i in dist_from_source) 
    {
        if(Number(dist_from_source[i])<mini)
        {
          if(visited.includes(i))
            continue;
            mini=dist_from_source[i];
            ind=i;
        }
       
    }
    let r=Number(seg(ind));
    let c=Number(ind.substring(2));
    console.log('------->',r,c)
    let str='#tr'+r+' .td'+c;
    let interval=setTimeout(()=>{
      if((ind!=src && ind!=dest))
      {
      let u= document.querySelector(str)
      console.log('-->',u.getAttribute('class'))
      u.classList.add('anime');
      }
      let inter;
      if(ind==dest)
      {
       // clearInterval(inter);
       printPath(output);
        flag=1;
      }

      console.log(flag);
    },10*j)
    // if(j==len || ind==dest)
    // {
    //   clearInterval(interval);
    //   printPath(output);
    // }
    visited.push(ind);
    if(r-1>=0)
    {
        let cr=r-1;
        let cc=c;
        let comb=cr+'+'+cc;
       
        if(dist_from_source[comb]>dist_from_source[ind]+arr[cr][cc])
        {
            dist_from_source[comb]=dist_from_source[ind]+arr[cr][cc];
            parent[comb]=ind;
        }
    }
    if(r+1<31)
    {
        let cr=r+1;
        let cc=c;
        let comb=cr+'+'+cc;
        if(dist_from_source[comb]>dist_from_source[ind]+arr[cr][cc])
        {
            dist_from_source[comb]=dist_from_source[ind]+arr[cr][cc];
            parent[comb]=ind;
         
        }
        
    }

    if(c+1<61)
    {
        let cr=r;
        let cc=c+1;
        let comb=cr+'+'+cc;
        if(dist_from_source[comb]>dist_from_source[ind]+arr[cr][cc])
        {
            dist_from_source[comb]=dist_from_source[ind]+arr[cr][cc];
            parent[comb]=ind;
        }
    }

    if(c-1>=0)
    {
        let cr=r;
        let cc=c-1;
        let comb=cr+'+'+cc;
        if(dist_from_source[comb]>dist_from_source[ind]+arr[cr][cc])
        {
            dist_from_source[comb]=dist_from_source[ind]+arr[cr][cc];
            parent[comb]=ind;
     
        }

    }

    


}
let xx=dest;
console.log(dest)
output=[]
console.log(parent)
while(parent[xx]!=-1)
{
  
  console.log(parent[xx]);
  output.push(parent[xx]);
  xx=parent[xx];
}
// printPath(output);
// return output;
console.log('finished!!')

}



document.getElementById('initiate').addEventListener('click',()=>{
  alert('clicked!!')



 
  
dijkstra(arr,src_define,dest_define,printPath);
  
document.getElementById('clear').addEventListener('click',()=>{
  setDefaulter();
})
});







