pragma solidity ^0.8.0;

contract ThreadFactory {
    
    address[] public deployedThreads;
    
    event ThreadCreation(
        address hostedAt
    );
    
    function createThread(string memory title) public returns (address)
    {
        address newThreadAddress = address(new Thread(title, msg.sender));
        deployedThreads.push(newThreadAddress);
        emit ThreadCreation(newThreadAddress);
        return newThreadAddress;
    }
    
    function getDeployedThreads() public view returns (address[] memory)
    {
        return deployedThreads;
    }
    
}


contract Thread{
    
    address public manager; //address of the person who create the contract
    string public title;
    uint public creationDateTime;
    uint public totalPosts;
    bool public active;
  
       
    //Struct definition for any message inside a thread    
    
    struct Post{
        string message;
        uint timestamp;
        address sender;
    }
    
    Post[] public posts;
    

    constructor(string memory threadTitle, address creator) public {
        
        manager = creator;
        title = threadTitle;
        creationDateTime = block.timestamp;
        active = true;
        
    }
    
     modifier restricted(){ 
        require(msg.sender == manager);
        _;
    }
    
    function disable() restricted public
    {
        active = false;
    }

    
    function addPost (string memory message) public
    {
        require(active);
        
        Post memory newPost =  Post({
             message: message,
             timestamp: block.timestamp,
             sender: msg.sender
         });
        
        posts.push(newPost);
        
        totalPosts++;
        
    }
    
    function getSummary() public view returns(address,string memory ,uint,uint,bool)
    {
        return(manager,title,creationDateTime,totalPosts,active);
    }
    
}    