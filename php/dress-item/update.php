<?php
    include "../connect.php";
    if($_SERVER['REQUEST_METHOD']=='POST'){
        $id= $_POST['id']; 
        $name= $_POST['product-name'];         
        $category= $_POST['category'];
        $price= $_POST['product-price'];
        $description= $_POST['description'];
        $image = $_FILES["product-image"]["name"];
        
        // saving the uploaded image into image folder
        $tempname = $_FILES["product-image"]["tmp_name"];
        $folder = "./images/" . $image;
        move_uploaded_file($tempname, $folder);

        if(!empty($name) && !empty($category) && !empty($price) && !empty($description) && !empty($image)){

            $sql = "update `dress-item` set name='$name',category='$category', price='$price', description='$description', image='$image'  where id=$id";
            $result =mysqli_query($con,$sql);
            if(!$result){
                echo json_encode($mysqli->error);
            }else{
                echo json_encode("Successfully Updated !");
            }  
        }
    }
  
?>