
const rseg=(s)=>
{
  let x=s.indexOf('+');
  let op=s.substring(x+1);
  return Number(rseg);
}
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
    
    if(visited_dfs[i][j]==1)
        return false;
    
    return true;
} 
const dfs_search=((arr,src,dest)=>
{



    stack=[];
    visited_order=[];
    stack.push(src);
    for(let i=0;i<table_rows;i++)
    {
        for(let j=0;j<table_rows;j++)
        {
            visited_dfs[i][j]=0;
        }
    }
    while(stack.length>0)
    {
            if(stack[stack.length-1]==dest)
                break;
            
            let s=stack[stack.length-1];
            let r=lseg(s);
            let c=rseg(s);
            //left movement possible
            let kickfromstack=true;
            if(ispossible(r,c-1,visited_dfs))
            {
                kickfromstack=false;
                for(let j=c-1;j>=0;j--)
                {
                    if(ispossible(r,j,visited_dfs)==false)
                        break;
                    
                    visited_dfs[r][j]=1;
                    
                    let id='#tr'+r+' .td'+j;
                    document.querySelector(id).classList.add('anime');
                    visited_order.push(id);
                    
                }

            }
            else if(ispossible(r-1,c,visited_dfs))
            {
                kickfromstack=false;
                for(let i=r-1;i>=0;i--)
                {
                    if(ispossible(i,c,visited_dfs)==false)
                    break;
                
                visited_dfs[i][c]=1;
                let id='#tr'+i+' .td'+c;
                document.querySelector(id).classList.add('anime');
                visited_order.push(id);
                }
            }
            else if(ispossible(r,c+1,visited_dfs))
            {
                kickfromstack=false;
                for(let j=c+1;j<table_columns;j++)
                {
                    if(ispossible(r,j,visited_dfs)==false)
                    break;
                
                visited_dfs[r][j]=1;
                let id='#tr'+r+' .td'+j;
                document.querySelector(id).classList.add('anime');
                visited_order.push(id);
                }
            }
            else if(ispossible(r+1,c,visited_dfs))
            {
                kickfromstack=false;
                for(let i=r+1;i<table_rows;i++)
                {
                    if(ispossible(i,c,visited_dfs)==false)
                    break;
                
                visited_dfs[i][c]=1;
                let id='#tr'+i+' .td'+c;
                document.querySelector(id).classList.add('anime');
                visited_order.push(id);
                }
            }



            if(kickfromstack==true)
            {
                stack.pop();
            }

            
    }
    // 0) Do until stack empty

    //1)select direction to move from stack top location that has not been visited

    //2)travel in the direcction until u can and push in stack as u travel

    //3)on coming to halt pop the topmost array element and repeat step 1 
})