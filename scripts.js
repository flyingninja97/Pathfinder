// Initial setup of rows and columns
let origin_selected=false;
let total_visited_nodes=0;
let total_nodes_in_finalpath=0;
let flag=0;
let table_rows=window.innerHeight/35;
let table_columns=window.innerWidth/30;
let start_node_row,start_node_col,end_node_col,end_node_row,src_define,dest_define,src_id,dest_id;
start_node_row=Math.floor(Math.random() * (table_rows));  
start_node_col=Math.floor(Math.random() * (table_columns));
end_node_row=Math.floor(Math.random() * (table_rows));
end_node_col=Math.floor(Math.random() * (table_columns));

src_define=start_node_row+'+'+start_node_col;
dest_define=end_node_row+'+'+end_node_col;
src_id='#tr'+start_node_row+' .td'+start_node_col;
dest_id='#tr'+end_node_row+' .td'+end_node_col;

const initialize_variables=(r,c)=>{


start_node_col=Math.floor(Math.random() * (table_columns));
end_node_row=Math.floor(Math.random() * (table_rows));
end_node_col=Math.floor(Math.random() * (table_columns));

src_define=start_node_row+'+'+start_node_col;
dest_define=end_node_row+'+'+end_node_col;
src_id='#tr'+start_node_row+' .td'+start_node_col;
dest_id='#tr'+end_node_row+' .td'+end_node_col;

}   
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

const rseg=(s)=>
{
  let x=s.indexOf('+');
  let op=s.substring(x+1);
  return rseg;
}
let table=document.getElementById('tbl');

for(let i=0;i<table_rows;i++)
{
  let tre=document.createElement('tr');
  let idx='tr';
  idx+=i;
  tre.setAttribute('id',idx);
  table.appendChild(tre);


}



let mouseclicked=false;
let arr=[];
let src_ind;
let dest_ind;
for(let i=0;i<table_rows;i++)
      {
        let a2=[];
        for(let j=0;j<table_columns;j++)
        {
          a2.push(1);
        }
        arr.push(a2);
      }
const setup=()=>
{   


    start_node_row=Math.floor(Math.random() * (table_rows));  
    start_node_col=Math.floor(Math.random() * (table_columns));
    end_node_row=Math.floor(Math.random() * (table_rows));
    end_node_col=Math.floor(Math.random() * (table_columns));
   
    src_define=start_node_row+'+'+start_node_col;
    dest_define=end_node_row+'+'+end_node_col;
    src_id='#tr'+start_node_row+' .td'+start_node_col;
    dest_id='#tr'+end_node_row+' .td'+end_node_col;



    for (let i=0;i<table_rows;i++)
      {
        let row;
        row="tr"+i;
        let t=document.getElementById(row);
        for(let j=0;j<table_columns;j++)
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
        let selector='#'+row+' '+'.'+col;
        if(selector==src_id || selector==dest_id)
            {
                origin_selected='true';
                return ;
            }
        if(!document.querySelector(selector).classList.contains('tblcell'))
        {
            document.querySelector(selector).classList.add('tblcell');

     
        arr[row_num][col_num]=Infinity ;
        }
        else
        {
            document.querySelector(selector).classList.remove('tblcell')
  
          arr[row_num][col_num]=1;
        }
        

      });
      document.getElementById('tbl').addEventListener('mousedown',()=>{
        mouseclicked=true;
   
      })


    document.getElementById('tbl').addEventListener('mouseup',()=>{
      mouseclicked=false;
   
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
          if(origin_selected==true)
          {

          }
          if(selector==src_id || selector==dest_id)
          return ;
          if(!document.querySelector(selector).classList.contains('tblcell'))
          {
              document.querySelector(selector).classList.add('tblcell');
  
    
          arr[row_num][col_num]=Infinity ;
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

  for (let i=finalpath.length-1,j=0;i>=0;i--,j++)
      {

        setTimeout(()=>{
          let r=Number(seg(finalpath[i]));
          let c=Number(finalpath[i].substring(2));
          let str='#tr'+r+' .td'+c;
        document.querySelector(str).classList.remove('anime');
        document.querySelector(str).classList.add('finalpath')
        },50*j);
      
      }

    }
const dijkstra= (arr,src,dest,printPath)=>
{

  let visited=[];
  let parent={};
    parent[src]=-1;
    let dist_from_source = {};
    for(let i=0;i<table_rows ;i++)
      {
        for(let j=0;j<table_columns;j++)
          {
            let ind=i+'+'+j;
          dist_from_source[ind]=Infinity ;
          if(ind==src) 
            dist_from_source[ind]=0;
      } 
    }

    let len=mapLen(dist_from_source);

for(let j=1;j<=len && !visited.includes(dest);j++)
{
  let mini=Infinity;
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
    if(!isFinite(mini))
        {
           return ; 
        }
    let r=Number(seg(ind));
    let c=Number(ind.substring(2));
   
    let str='#tr'+r+' .td'+c;
    let interval=setTimeout(()=>{
      if((ind!=src && ind!=dest && mini!=Infinity))
      {
      let u= document.querySelector(str)
      u.classList.add('anime');
      }
      let inter;
      if(ind==dest)
      {
   
       printPath(output);
        flag=1;
      }
    },10*j)
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
    if(r+1<table_rows)
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

    if(c+1<table_columns)
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

output=[]

let counter=0;
while(parent[xx]!=-1 && counter<=100000)
{
  counter+=1;
  if(parent[xx]!=undefined)
  {
 
  output.push(parent[xx]);
  xx=parent[xx];
  }
  
}


}



document.getElementById('initiate').addEventListener('click',()=>{
  alert('clicked!!')
  
  

dijkstra(arr,src_define,dest_define,printPath);
  
});



document.getElementById('clear').addEventListener('click',()=>{
  arr=[];
  for(let i=0;i<table_rows;i++)
      {
        let a2=[];
        for(let j=0;j<table_columns;j++)
        {
          a2.push(1);
        }
        arr.push(a2);
      }
  
  for(let i=0;i<table_rows;i++)
  {
    for(let j=0;j<table_columns;j++)
    {
      if((i==start_node_row && j==start_node_col)||(i==end_node_row && j==end_node_col))
        continue;


        let selector='#tr'+i+' '+' .td'+j;
        if(document.querySelector(selector).classList.contains('tblcell'))
        {
            document.querySelector(selector).classList.remove('tblcell');
        }
        if(document.querySelector(selector).classList.contains('anime'))
        {
            document.querySelector(selector).classList.remove('anime');
        }

        if(document.querySelector(selector).classList.contains('finalpath'))
        {
            document.querySelector(selector).classList.remove('finalpath');
        }

        
    }
  }
});


window.addEventListener('resize',()=>{
  location.reload();
})



