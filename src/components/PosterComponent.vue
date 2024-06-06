<script>
export default{
    name: 'Film',
    data(){
        return {
            
        }
    },
    props: {
        title: String,
        originalTitle: String,
        langauge: String,
        score: Number
    }
}
</script>
<template>
    <hr>
    <div>
        {{ title }}
    </div>
    <div>
        {{ originalTitle }}
    </div>
    <div>
        {{ langauge }}
    </div>
    <div>
        {{ score }}
    </div>
    <hr>
</template>
<style></style>