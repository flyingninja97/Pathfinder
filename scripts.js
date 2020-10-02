// Initial setup of rows and columns
let selected_algo=false;
let selected_algo_value='';
let origin_selected=false;
let dest_selected=false;
let total_visited_nodes=0;
let algo_speed=20;
let disabled=false;
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

function javascript_abort()
{
   throw new Error('This is not an error. This is just to abort javascript');
}
const disable_fun=()=>{
  console.log('It has finished!!')
}
const wipeout=()=>{

  for(let i=0;i<table_rows;i++)
  {
    for(let j=0;j<table_columns;j++)
    {
      let str='#tr'+i+' .td'+j;
      if(document.querySelector(str).classList.contains('finalpath'))
      document.querySelector(str).classList.remove('finalpath');

      if(document.querySelector(str).classList.contains('anime'))
      document.querySelector(str).classList.remove('anime')
    }
  }
}
const initialize_start=(r1,c1)=>{

  start_node_row=r1
  start_node_col=c1
  
  src_define=start_node_row+'+'+start_node_col;
  src_id='#tr'+start_node_row+' .td'+start_node_col;

}  

const initialize_end=(r2,c2)=>{

  end_node_row=r2
  end_node_col=c2
  
  dest_define=end_node_row+'+'+end_node_col;
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
  return Number(op);
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
        if(origin_selected)
        {
          origin_selected=false;
          return ;
        }

        if(dest_selected)
        {
          dest_selected=false;
          return ;
        }
        if(selector==dest_id)
        {
            dest_selected=true;
        }
        else if(selector==src_id)
            {
              console.log('clicked on origin')
              
                origin_selected=true;
            }

        if(origin_selected==false && dest_selected==false)
        {
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
        

      });
      document.getElementById('tbl').addEventListener('mousedown',(e)=>{
        mouseclicked=true;
   
      })


    document.getElementById('tbl').addEventListener('mouseup',()=>{
      mouseclicked=false;
   
    })
  
    document.querySelector(src_id).classList.add('source')
    document.querySelector(dest_id).classList.add('destination');

    document.getElementById('tbl').addEventListener('mouseover',(e)=>{
      console.log('MOUSE OVERRR!!')
      
      
      if(origin_selected)
      {
        console.log(origin_selected);
        //alert(origin_selected)
        let row=e.target.parentNode.id;
        let col=e.target.className;
        console.log(row,col);
        col=extractcol(col);
        let row_num=Number(row.substring(2));
        let col_num=Number(col.substring(2));
        
        let selector='#'+row+' '+'.'+col;
        document.querySelector(src_id).classList.remove('source');
        // alert('hahah')
        document.querySelector(selector).classList.add('source');
        initialize_start(row_num,col_num);





     
        
      }

      if(dest_selected)
      {
        console.log(dest_selected);
        //alert(origin_selected)
        let row=e.target.parentNode.id;
        let col=e.target.className;
        console.log(row,col);
        col=extractcol(col);
        let row_num=Number(row.substring(2));
        let col_num=Number(col.substring(2));
        
        let selector='#'+row+' '+'.'+col;
        document.querySelector(dest_id).classList.remove('destination');
        // alert('hahah')
        document.querySelector(selector).classList.add('destination');
        initialize_end(row_num,col_num);
      }
      
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
              console.log('YOYOYO')
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
        if(i==0)
        {
          //enable  clear and visualize
        disabled=false;
        }
        },algo_speed*j);
      
      }

    }
const dijkstra= (arr,src,dest,printPath)=>
{

  
  wipeout();
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
    },algo_speed*j)
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







document.getElementById('clear').addEventListener('click',()=>{

  if(disabled)
    return ;
  arr=[];
  // if(document.getElementById('src_id').classList.contains('finalpath'))
  //   document.getElementById('src_id').classList.remove('finalpath');

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

document.getElementById('algolist').addEventListener('click',(e)=>{
  console.log(e.target.id);
  document.getElementById('dropdown01').innerHTML=e.target.id;
  selected_algo=true;
  selected_algo_value=e.target.id;
})



document.getElementById('speedlist').addEventListener('click',(e)=>{
  console.log(e.target.id);
  document.getElementById('dropdown02').innerHTML=e.target.id;
  

  if(e.target.id=="Speed:Slow")
  {
    algo_speed=50
  }
  else if(e.target.id=="Speed:Medium")
  {
    algo_speed=20;
  }
  else
  {
    algo_speed=8;
  }
})


window.addEventListener('resize',()=>{
  location.reload();
})



















// const rseg=(s)=>
// {
//   let x=s.indexOf('+');
//   let op=s.substring(x+1);
//   return Number(rseg);
// }
const lseg=(s)=>{
    let op='';
    for(let i=0;i<s.length;i++)
    {
        if(s[i]=='+')
            break;
        else
            op+=s[i];
    }

    return Number(op);
}
const ispossible=(r,c,visited_dfs)=>{

    if(r<0 || r>=table_rows)
        return false;
    if(c<0 || c>=table_columns)
        return false;

    if(arr[r][c]==Infinity)
        return false;
    
    if(visited_dfs[r][c]==1)
        return false;
    
    return true;
} 
const dfs_search=((arr,src,dest)=>
{

  console.log(src,dest);

    stack=[];
    visited_order=[];
    visited_dfs=[];
    stack.push(src);
    for(let i=0;i<table_rows;i++)
    {
      temp=[];
        for(let j=0;j<table_rows;j++)
        {
            temp.push(0);
        }
        visited_dfs.push(temp);
    }
    let complete=false;
    while(stack.length>0 && complete==false)
    {
      console.log(stack.length);
            if(stack[stack.length-1]==dest)
                break;
            

            
            let s=stack[stack.length-1];
            let r=lseg(s);
            let c=rseg(s);
            //left movement possible
            let kickfromstack=true;
            console.log('roorororo',r,'dest',c);
            if(ispossible(r,c-1,visited_dfs))
            {
                kickfromstack=false;
                for(let j=c-1;j>=0;j--)
                {

                    
                    if(ispossible(r,j,visited_dfs)==false)
                        break;
                    
                    visited_dfs[r][j]=1;
                    stack.push(r+'+'+j);
                   
                    
                    let id='#tr'+r+' .td'+j;
                    console.log(id);
             //       document.querySelector(id).classList.add('anime');
                    visited_order.push(id);

                    let str_form=r+'+'+j;
                    if(str_form==dest)
                      {
                        complete=true;
                        break;
                      }
                    
                }

            }
            else if(ispossible(r-1,c,visited_dfs))
            {
                kickfromstack=false;
                for(let i=r-1;i>=0;i--)
                {
                    if(ispossible(i,c,visited_dfs)==false)
                    break;

                    stack.push(i+'+'+c);
                
                visited_dfs[i][c]=1;
                let id='#tr'+i+' .td'+c;
                console.log(id);
             //   document.querySelector(id).classList.add('anime');
                visited_order.push(id);


                let str_form=i+'+'+c;
                if(str_form==dest)
                  {
                    complete=true;
                    break;
                  }
                }
            }
            else if(ispossible(r,c+1,visited_dfs))
            {
                kickfromstack=false;
                for(let j=c+1;j<table_columns;j++)
                {
                    if(ispossible(r,j,visited_dfs)==false)
                    break;
                
                    stack.push(r+'+'+j);
                visited_dfs[r][j]=1;
                let id='#tr'+r+' .td'+j;
                console.log(id);
             //   document.querySelector(id).classList.add('anime');
                visited_order.push(id);


                let str_form=r+'+'+j;
                if(str_form==dest)
                  {
                    complete=true;
                    break;
                  }
                }
            }
            else if(ispossible(r+1,c,visited_dfs))
            {
                kickfromstack=false;
                for(let i=r+1;i<table_rows;i++)
                {
                    if(ispossible(i,c,visited_dfs)==false)
                    break;
                    stack.push(i+'+'+c);
                visited_dfs[i][c]=1;
                let id='#tr'+i+' .td'+c;
                console.log(id);
                //document.querySelector(id).classList.add('anime');
                visited_order.push(id);


                let str_form=i+'+'+c;
                if(str_form==dest)
                  {
                    complete=true;
                    break;
                  }
                }
            }



            if(kickfromstack==true)
            {
                stack.pop();
            }

            
    }


    return {visited_order,stack};

    // (stack);console.log
    // 0) Do until stack empty

    //1)select direction to move from stack top location that has not been visited

    //2)travel in the direcction until u can and push in stack as u travel

    //3)on coming to halt pop the topmost array element and repeat step 1 
})

const dfs_init=()=>{
  
    let output=dfs_search(arr,src_define,dest_define);
    let len=output['visited_order'].length;
    let len2=output['stack'].length;
    let f=0;
    for(let i=0;i<len;i++)
    {
      setTimeout(()=>{
        document.querySelector(output['visited_order'][i]).classList.add('anime');
        if(i==len-1)
        {
          for(let i=0;i<len2;i++)
          {
            setTimeout(()=>{
              console.log('hdhioeofinesoi');
              console.log(output['stack'][i]);
              let r=lseg(output['stack'][i]);
              let c=rseg(output['stack'][i]);
              let str='#tr'+r+' .td'+c;
              document.querySelector(str).classList.remove('anime');
              document.querySelector(str).classList.add('finalpath');
            },algo_speed*i);
          }
        
  
        }   
      },algo_speed*i);
      
      
    }
  
  
  
  
  
  }

 










const manhattan=(r1,c1,r2,c2)=>{

  return Math.abs(r1-r2)+Math.abs(c1-c2);

}







  const astar= (arr,src,dest,printPath)=>
{

  let dest_row=lseg(dest);
  let dest_col=rseg(dest);
  let src_row=lseg(src);
  let src_col=lseg(src);
  let h1=manhattan(dest_row,dest_col,src_row,src_col);
  wipeout();
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
            dist_from_source[ind]=0+h1;
      } 
    }

    let len=mapLen(dist_from_source);

for(let j=1;j<=len && !visited.includes(dest);j++)
{
  let mini=Infinity;
  let ind=src;
    for(i in dist_from_source) 
    {
        let r1=lseg(i);
        let c1=rseg(i);
        let m1=manhattan(r1,c1,dest_row,dest_col)
        if(Number(dist_from_source[i]+m1)<mini)
        {
          if(visited.includes(i))
            continue;
            mini=dist_from_source[i]+m1;
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
    },algo_speed*j)
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


  if(disabled)
    return ;
  // javascript_abort();
  wipeout();
  

  disabled=true;
  if(!selected_algo)
  {
    alert('Select an algorithm first!');
    return ;
  }
  
  
  
if(selected_algo_value=='Dijkstra')
dijkstra(arr,src_define,dest_define,printPath);
else if(selected_algo_value=='astar')
  astar(arr,src_define,dest_define,printPath);
else
dfs_init();



  
});