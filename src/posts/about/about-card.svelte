<script lang="ts">
    const { title, company, company_url, experience } = $props()
</script>


<section
	class="flex sm:flex-row flex-col gap-8 border p-8 rounded-md"
>
        <div class="h-48 flex justify-start flex-col items-center sm:items-start"> 
            <img class="h-48 w-48 !m-0" src="/images/headshot.webp" alt="Headshot of Thompson Bear" />
        </div>
        <div class="flex flex-col justify-between text-center sm:text-left">
            <span class="font-title text-3xl mb-6">Thompson Bear</span>
            <div class="space-y-4">
                <div class="flex flex-col gap-2">
                    <span class="text-sm !text-foreground/60">Currently Working As</span>
                    <span class="!text-foreground/90">
                        {title} @ <a
                            class="font-bold text-primary no-underline decoration-2 underline-offset-[6px] transition-all hover:underline hover:underline-offset-4"
                            href={company_url}>{company}</a
                        >
                    </span>
                </div>
                <div  class="flex flex-col gap-2">
                    <span class="text-sm !text-foreground/60 !m-0">Experience</span>
                    <span class="!text-foreground/90">{experience}</span>
                </div>
            </div>
            
        </div>
    
</section>